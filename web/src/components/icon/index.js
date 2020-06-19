import React from 'react'
import DevIcon from './dev'
import GithubIcon from './github'
import HamburgerIcon from './hamburger'
import TwitterIcon from './twitter'

function Icon (props) {
  switch (props.symbol) {
    case 'dev':
      return <DevIcon />
    case 'github':
      return <GithubIcon />
    case 'hamburger':
      return <HamburgerIcon />
    case 'twitter':
      return <TwitterIcon />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
