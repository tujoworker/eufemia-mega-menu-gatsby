import React from 'react'
import { OpenMegaMenuLink } from '../../MegaMenuLinks'
import { Heading } from 'dnb-ui-lib/components'
import Link from '../../Link'

export default function OtherPage({ location }) {
  return (
    <>
      <Heading reset={1} bottom>
        Other Page
      </Heading>
      <Link to="/">Home</Link>
      <br />
      <Link to="/about">Back to About</Link>
      <br />
      <OpenMegaMenuLink {...{ location }} />
    </>
  )
}
