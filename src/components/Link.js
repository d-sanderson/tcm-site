/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import MuiLink from '@mui/material/Link'
import { Link as GatsbyLink } from 'gatsby'

// eslint-disable-next-line max-len
const Link = React.forwardRef((props, ref) => <MuiLink component={GatsbyLink} ref={ref} {...props} />)

export default Link
