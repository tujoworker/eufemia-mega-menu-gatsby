import React from 'react'
import { ClassNames } from '@emotion/core'
import { Location } from '@reach/router'
import { Modal } from 'dnb-ui-lib/components'
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
                <MegaMenuDrawer
                  open_state={prevLocation ? 'opened' : 'closed'}
                  on_close={() => {
                    prevLocation && navigate(prevLocation.pathname)
                  }}
                >
                  <MegaMenu location={location} />
                </MegaMenuDrawer>
              )}
            </>
          )
        }}
      </Location>
    </div>
  )
}

// const DrawerSection = styled(Section)`
//   min-height: 80vh;
//   &::after {
//     color: var(--color-lavender);
//   }
// `

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

function MegaMenuDrawer({ children, ...props }) {
  return (
    <ClassNames>
      {({ css }) => (
        <Modal
          mode="drawer"
          container_placement="top"
          // title={<h1 className="dnb-sr-only">I'm a MegaMenu</h1>}
          trigger_hidden
          no_animation_on_mobile
          content_class={css`
            &.dnb-modal__content--top .dnb-modal__content__inner {
              height: 70vh;
              padding: 0;
              .dnb-modal__wrapper {
                margin: 0;
                margin-top: 4rem; /* use our own spacing */
                overflow: hidden; /* because of our fullscreen hr-lines */
              }
            }

            html:not([data-dnb-test])
              &.dnb-modal__content--drawer
              .dnb-modal__content__inner {
              animation: show-drawer 800ms cubic-bezier(0.04, 0.65, 0.55, 0.95)
                forwards;
            }
          `}
          {...props}
        >
          {children}
        </Modal>
      )}
    </ClassNames>
  )
}
