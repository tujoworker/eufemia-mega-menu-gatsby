import React from 'react'
import { OpenMegaMenuLink } from '../MegaMenuLinks'
import { Heading } from 'dnb-ui-lib/components'
import Link from '../Link'

export default function IndexPage({ location }) {
  return (
    <>
      <Heading reset={1} bottom>
        Home
      </Heading>
      <Link to="/about">About</Link>
      <br />
      <Link to="/mega-menu">Open MegaMenu as a page</Link>
      <br />
      <OpenMegaMenuLink {...{ location }} />
    </>
  )
}
