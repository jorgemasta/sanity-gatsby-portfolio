export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e92e609396d2423baf67f2c',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-4ji7kvij',
                  apiId: '70db2951-47f3-42c0-9510-970ae89d926a'
                },
                {
                  buildHookId: '5e92e60929b6afac733040ec',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-48srmbvp',
                  apiId: '8db0e803-947a-4139-acb6-951851b1ccd0'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jorgemasta/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-48srmbvp.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
