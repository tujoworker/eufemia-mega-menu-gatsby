import React from 'react'
import styled from '@emotion/styled'
import { ClassNames } from '@emotion/core'
import {
  // Router,
  Location
} from '@reach/router'
import { Section, Modal } from 'dnb-ui-lib/components'

// import { OpenMegaMenuLink } from '../MegaMenuLinks'
import MegaMenu from './pages/mega-menu'

// This MegaMenu is offline usable
// .style.display = 'none'

export default function Layout({ children }) {
  return (
    <div className="dnb-core-style">
      <Location>
        {({ location, navigate }) => {
          // Check if the user entered the page with /mega-menu
          // if so, then we define where to "go back again"
          if (!location.state && location?.pathname.includes('/menu')) {
            location = {
              ...location,
              state: { prevLocation: { pathname: '/' }, asModal: true }
            }
          }
          const { prevLocation } = location.state || {}

          return (
            <>
              <NoJavaScriptFallback location={location} />

              {children}

              {location?.pathname.includes('/menu') && (
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
  return (
    <div
      style={{
        display: typeof window !== 'undefined' ? 'none' : 'block'
      }}
      aria-hidden={typeof window !== 'undefined'}
    >
      <MegaMenu location={location} onload />
    </div>
  )
}

function Drawer({ children, ...props }) {
  return (
    <ClassNames>
      {({ css }) => (
        <Modal
          mode="drawer"
          title="I'm a MegaMenu"
          trigger_hidden
          no_animation_on_mobile
          {...props}
        >
          <DrawerSection spacing>{children}</DrawerSection>
        </Modal>
      )}
    </ClassNames>
  )
}
