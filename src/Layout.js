import React from 'react'
import styled from '@emotion/styled'
import { ClassNames } from '@emotion/core'
import { Location } from '@reach/router'
import { Section, Modal } from 'dnb-ui-lib/components'

import MegaMenu from './pages/mega-menu'

// import 'dnb-ui-lib/src/style'// core styles
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'

export default function Layout({ children }) {
  return (
    <div className="dnb-core-style">
      <NoJavaScriptFallback />
      <Location>
        {({ location, navigate }) => {
          const hasMegaMenuPath = location?.pathname.includes('/mega-menu')

          // Check if the user entered the page with /mega-menu
          // if so, then we define where to "go back again"
          if (hasMegaMenuPath && !location?.state?.asModal) {
            location = {
              ...location,
              state: { prevLocation: { pathname: '/' }, asModal: false }
            }
          }

          const { prevLocation } = location.state || {}

          return (
            <>
              {children}

              {hasMegaMenuPath && location?.state?.asModal && (
                <Drawer
                  open_state={prevLocation ? 'opened' : 'closed'}
                  on_close={() => {
                    prevLocation && navigate(prevLocation.pathname)
                  }}
                >
                  <MegaMenu location={location} />
                </Drawer>
              )}
            </>
          )
        }}
      </Location>
    </div>
  )
}

const DrawerSection = styled(Section)`
  min-height: 80vh;

  &::after {
    color: var(--color-lavender);
  }
`

// In case there is no JS, the user sees the whole meny
function NoJavaScriptFallback({ location }) {
  const [isValid, setIsValid] = React.useState(typeof window !== 'undefined')
  React.useEffect(() => {
    setIsValid(typeof window !== 'undefined')
  }, [])
  return (
    <noscript key="no-script">
      Eufemia works best with JavaScript enabled.
      <div
        style={{
          display: isValid ? 'none' : 'block'
        }}
        aria-hidden={isValid}
      >
        <MegaMenu location={location} />
      </div>
    </noscript>
  )
}

function Drawer({ children, ...props }) {
  return (
    <ClassNames>
      {
        (/*{ css }*/) => (
          <Modal
            mode="drawer"
            title="I'm a MegaMenu"
            trigger_hidden
            no_animation_on_mobile
            {...props}
          >
            <DrawerSection spacing>{children}</DrawerSection>
          </Modal>
        )
      }
    </ClassNames>
  )
}
