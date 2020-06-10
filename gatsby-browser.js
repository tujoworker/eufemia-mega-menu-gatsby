/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import PropTypes from 'prop-types'
import EufemiaProvider from 'dnb-ui-lib/shared/Provider'
import { resetLevels } from 'dnb-ui-lib/components/Heading'
import Layout from './src/Layout'

// currently, the focus helper is not in use
// import { applyPageFocus } from 'dnb-ui-lib/shared/helpers'

// Optional, use a Provider
// Also, we do not use the additional wrapper (dnb-core-style) if we would import the core styles, but we import basis for now
export const wrapRootElement = ({ element }) => (
  <EufemiaProvider locale="en-US">{element}</EufemiaProvider>
)
wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired
}

// Optional, use a Provider
// Also, we do not use the additional wrapper (dnb-core-style) if we would import the core styles, but we import basis for now
export const wrapPageElement = ({ element, ...rest }) => (
  <Layout {...rest}>{element}</Layout>
)
wrapPageElement.propTypes = {
  element: PropTypes.node.isRequired
}

export const onRouteUpdate = () => {
  resetLevels(1)

  // in order to use our own focus management by using applyPageFocus
  // we have to disable the focus management from Reach Router
  // More info: why we have to have the tabindex https://reach.tech/router/accessibility
  // More info: The div is necessary to manage focus https://github.com/reach/router/issues/63#issuecomment-395988602
  try {
    const elem = document.querySelector('div[role="group"][tabindex="-1"]')
    if (elem) {
      elem.removeAttribute('tabindex')
      elem.removeAttribute('role')
    }
  } catch (e) {
    console.log(e)
  }
}

export const replaceComponentRenderer = ({ props, loader }) => {
  return React.createElement(ReplaceComponentRenderer, { ...props, loader })
}

class ReplaceComponentRenderer extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    const {
      location,
      loader: { loadPageSync }
    } = props

    // we do that here, because loadPageSync does not return correct data in that stage
    const asModal = location?.state?.asModal
    if (asModal) {
      const resourcesPathname = location?.state?.prevLocation?.pathname || '/'
      const modalPageResources = loadPageSync(resourcesPathname)
      return {
        modalPageResources
      }
    }

    return null
  }

  constructor(props) {
    super(props)

    const { location } = props

    this.state = { pathname: location.pathname }
  }

  render() {
    const props = this.props
    const { location } = props
    let { pageResources } = props

    const asModal = location?.state?.asModal
    if (asModal) {
      const { modalPageResources } = this.state
      if (modalPageResources?.component) {
        pageResources = modalPageResources
      }
    }

    const pageElement = React.createElement(pageResources.component, {
      ...props,
      key: pageResources.page.path
    })

    return pageElement
  }
}
