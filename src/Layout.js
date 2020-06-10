import React from 'react'
import styled from '@emotion/styled'
import { ClassNames } from '@emotion/core'
import {
  // Router,
  Location
} from '@reach/router'
import { Section, Modal } from 'dnb-ui-lib/components'
// import Home from './pages/index'
// import About from './pages/about'
// import OtherPage from './pages/about/other-page'
// import NotFound from './pages/404'

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
              state: { prevLocation: { pathname: '/' } }
            }
          }
          const { prevLocation } = location.state || {}

          console.log(location.pathname, prevLocation)

          return (
            <>
              {children}

              {/* <Routes location={prevLocation ? prevLocation : location} /> */}

              <Drawer
                open_state={prevLocation ? 'opened' : 'closed'}
                on_close={() => {
                  prevLocation && navigate(prevLocation.pathname)
                }}
              >
                <MegaMenu location={location} />
              </Drawer>

              {/* {/\/mega-menu/.test(location.pathname) && <></>} */}
              {/* {!location?.pathname.includes('/menu') && children} */}
            </>
          )
        }}
      </Location>
    </div>
  )
}

// function Routes(props) {
//   return (
//     <Router {...props}>
//       <Home path="/" />
//       {/* <MegaMenu path="/mega-menu" /> */}
//       <About path="/about" />
//       <OtherPage path="/about/other-page" />
//       <NotFound path="*" />
//     </Router>
//   )
// }

const DrawerSection = styled(Section)`
  min-height: 80vh;

  &::after {
    color: var(--color-lavender);
  }
`

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
