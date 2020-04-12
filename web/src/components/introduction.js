import React from 'react'
import BlockText from './block-text'
import styles from './introduction.module.css'

function Introduction (props) {
  console.log(props.description)
  return (
    <div className={styles.root}>
      {props.title && <h1>{props.title}</h1>}
      {props.description && <BlockText blocks={props.description} />}
    </div>
  )
}

Introduction.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default Introduction
