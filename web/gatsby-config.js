// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'

const siteUrl = process.env.SITE_URL
if (!siteUrl) throw Error('Not defined `SITE_URL` in `.env`')

/**
 * SSR Feed
 */

// for Portable Text Serialization
const PortableText = require('@sanity/block-content-to-html')
const imageUrlBuilder = require('@sanity/image-url')
const h = PortableText.h
const imageUrlFor = source => imageUrlBuilder(clientConfig.sanity).image(source)

// Helper functions for Portable Text
const {format, isFuture} = require('date-fns')

function filterOutDocsPublishedInTheFuture ({publishedAt}) {
  return !isFuture(publishedAt)
}

function getBlogUrl (publishedAt, slug) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`
}

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jorge Masta (Developer)`,
        short_name: `Jorge Masta`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2E52A3`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
        theme_color_in_head: false // This will avoid adding theme-color meta tag.
      }
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site: sanitySiteSettings {
            title
            description
          }
        }
        `,
        feeds: [
          {
            serialize: ({query: {site, allSanityPost = []}}) => {
              return allSanityPost.edges
                .filter(({node}) => filterOutDocsPublishedInTheFuture(node))
                .filter(({node}) => node.slug)
                .filter(({node}) => node.title && node._rawBody && node._rawExcerpt)
                .map(({node}) => {
                  const {title, publishedAt, slug, _rawBody, _rawExcerpt} = node
                  const url = siteUrl + getBlogUrl(publishedAt, slug.current)
                  return {
                    title: title,
                    date: publishedAt,
                    url,
                    guid: url,
                    description: PortableText({
                      blocks: _rawExcerpt,
                      serializers: {
                        types: {
                          code: ({node}) =>
                            h('pre', h('code', {lang: node.language}, node.code))
                        }
                      }
                    }),
                    custom_elements: [
                      {
                        'content:encoded': PortableText({
                          blocks: _rawBody,
                          serializers: {
                            types: {
                              code: ({node}) =>
                                h('pre', h('code', {lang: node.language}, node.code)),
                              figure: ({node}) =>
                                h('img', {
                                  src: imageUrlFor(node.asset).url()
                                }),
                              authorReference: ({node}) => h('p', 'Author: ' + node.author.name)
                            }
                          }
                        })
                      }
                    ]
                  }
                })
            },
            query: `{
              allSanityPost(sort: {fields: publishedAt, order: DESC}) {
                edges {
                  node {
                    _rawExcerpt
                    _rawBody(resolveReferences: {maxDepth: 10})
                    title
                    publishedAt
                    slug {
                      current
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Jorge Masta - RSS Feed',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname
            // of current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/'
          }
        ]
      }
    }
  ]
}
