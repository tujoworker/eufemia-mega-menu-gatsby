import React from 'react'
import styled from '@emotion/styled'
import { Hr, P, Ul } from 'dnb-ui-lib/elements'
import {
  Heading
  // , Section, Modal
} from 'dnb-ui-lib/components'
import { SpacingHelper } from 'dnb-ui-lib/shared'
import Link from '../../Link'

export default function MegaMenu({ location }) {
  const { prevLocation } = location.state || {}

  return (
    <>
      {!prevLocation && (
        <>
          <Heading reset={1} bottom>
            MegaMenu
          </Heading>
          <P>
            Because I'm in a page, I have a{' '}
            <Link
              to="/"
              state={{
                prevLocation: null
              }}
            >
              Go to Home
            </Link>{' '}
            link
          </P>
          <Hr fullscreen light top bottom="large" />
        </>
      )}

      <MegaMenuBlock />
      <MegaMenuBlock />
      <MegaMenuBlock />
      <MegaMenuBlock />
    </>
  )
}

function MegaMenuBlock() {
  return (
    <>
      <MegaMenuUl>
        <MegaMenuLi>
          <Link to="/about">About</Link>
        </MegaMenuLi>
        <MegaMenuLi>
          <Link to="/about/other-page">Other page</Link>
        </MegaMenuLi>
      </MegaMenuUl>
      <Hr fullscreen light top bottom="large" />
    </>
  )
}

const MegaMenuUl = styled(Ul)`
  list-style: none;
  margin-left: 0;
`
const MegaMenuLi = styled.li(SpacingHelper)
