import { Backdrop, CircularProgress } from "@mui/material"

import { makeStyles } from "@mui/styles"

export default function BackdropLoading({ open, invisible }) {
  const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: 99,
    },
  }))

  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={open} invisible={invisible}>
      <CircularProgress color='error' size={75} />
    </Backdrop>
  )
}
