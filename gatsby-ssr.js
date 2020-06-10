/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Layout from './src/Layout'

// Optional, use a Provider
// Also, we do not use the additional wrapper (dnb-core-style) if we would import the core styles, but we import basis for now
export const wrapPageElement = ({ element, ...rest }) => (
  <Layout {...rest}>{element}</Layout>
)
wrapPageElement.propTypes = {
  element: PropTypes.node.isRequired
}
