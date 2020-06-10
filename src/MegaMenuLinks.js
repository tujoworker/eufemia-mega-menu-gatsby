import React from 'react'
import Link from './Link'

export default function MegaMenu() {
  return (
    <>
      {/* <h1>Mega Menu</h1> */}
      <Link to="/about">About</Link>
      <Link to="/about/other-page">OtherPage</Link>
    </>
  )
}

export function OpenMegaMenuLink({ location }) {
  return (
    <Link
      to="/menu"
      state={{
        prevLocation: JSON.parse(JSON.stringify(location))
      }}
    >
      Open MegaMenu
    </Link>
  )
}
