import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import serializers from './serializers'
import clientConfig from '../../client-config'

const BlockText = ({blocks}) => <BaseBlockContent blocks={blocks} serializers={serializers} {...clientConfig.sanity} />

export default BlockText
