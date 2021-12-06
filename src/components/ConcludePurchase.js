import React from "react"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import DialogContentText from "@mui/material/DialogContentText"

export default function ConcludePurchase({ open, close }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Nice choice, congratulations!</DialogTitle>

      <DialogContent>
        <DialogContentText>Close this alert and keep on buying.</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={close} color='secondary' variant='contained' fullWidth>
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  )
}
