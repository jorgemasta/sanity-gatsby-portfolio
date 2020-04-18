import React from 'react'
import BlockContent from './block-content'
import styles from './introduction.module.css'

function Introduction (props) {
  return (
    <div className={styles.root}>
      {props.title && <h1>{props.title}</h1>}
      {props.description && <BlockContent blocks={props.description} />}
    </div>
  )
}

Introduction.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default Introduction
