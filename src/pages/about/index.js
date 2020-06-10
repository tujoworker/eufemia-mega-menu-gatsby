import React from 'react'
import { OpenMegaMenuLink } from '../../MegaMenuLinks'
import { Heading } from 'dnb-ui-lib/components'
import Link from '../../Link'

export default function About({ location }) {
  return (
    <>
      <Heading reset={1} bottom>
        About
      </Heading>
      <Link to="/">Home</Link>
      <br />
      <Link to="/about/other-page">Other Page</Link>
      <br />
      <OpenMegaMenuLink {...{ location }} />
    </>
  )
}
