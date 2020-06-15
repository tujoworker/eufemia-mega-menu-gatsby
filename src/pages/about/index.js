import React from 'react'
import { ClassNames } from '@emotion/core'
import { Heading, Modal } from 'dnb-ui-lib/components'
import { OpenMegaMenuLink } from '../../MegaMenuLinks'
import Link from '../../Link'
import { settings } from 'dnb-ui-lib/icons'

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
      <br />
      <ToolsDrawer>All the great tools!</ToolsDrawer>
    </>
  )
}

function ToolsDrawer({ children, ...props }) {
  return (
    <ClassNames>
      {({ css }) => (
        <Modal
          top
          mode="drawer"
          container_placement="bottom"
          title={<h1 className="dnb-sr-only">I'm a Tool menu</h1>}
          trigger_icon={settings}
          hide_close_button
          // Remove all spacings
          content_class={css`
            .dnb-modal__content__inner {
              padding: 0;
              .dnb-modal__wrapper {
                margin: 0;
              }
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
