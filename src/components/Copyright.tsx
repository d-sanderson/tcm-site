import * as React from 'react'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

interface Props {
  author: string
}

export default function Copyright({ author }: Props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://tcm-site.vercel.app/">
        {author}
      </MuiLink>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  )
}
