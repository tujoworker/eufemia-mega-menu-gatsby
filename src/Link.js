import React from 'react'
import { Link as RouterLink } from 'gatsby'

export default function Link(props) {
  return <RouterLink className="dnb-anchor" {...props} />
}
