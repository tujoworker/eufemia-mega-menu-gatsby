import React from 'react'
import Link from './Link'

export function OpenMegaMenuLink({ location }) {
  return (
    <Link
      to="/mega-menu"
      state={{
        prevLocation: JSON.parse(JSON.stringify(location)),
        asModal: true
      }}
    >
      Open MegaMenu
    </Link>
  )
}
