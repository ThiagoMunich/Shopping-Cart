import React, { useState } from "react"

import Grid from "@mui/material/Grid"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

import useCart from "../hooks/useCart"
import { formatToBrlCurrency } from "../helpers/format"
import ConcludePurchase from "../components/ConcludePurchase"

export default function Sidebar({ open, close }) {
  const { cart, setCart } = useCart()

  const [conclude, setConclude] = useState(false)

  const changeQuantity = (product, type) => {
    const updatedCart = [...cart]

    if (type === "plusOne") {
      updatedCart.map(item =>
        item.id === product.id && item.quantity < item.rating.count ? (item.quantity += 1) : null
      )
    } else {
      updatedCart.map(item =>
        item.id === product.id && item.quantity > 0 ? (item.quantity -= 1) : null
      )
    }

    setCart(updatedCart)
  }

  const removeFromCart = product => {
    setCart(cart.filter(item => item.id !== product.id))

    if (cart.length === 1) {
      setTimeout(close, 0)
    }
  }

  const calculateTotalValue = () => {
    var totalValue = cart.reduce((total, actual) => {
      let quantityTimesPrice = actual.quantity * actual.price

      return (total += quantityTimesPrice)
    }, 0)

    return totalValue
  }

  return (
    <>
      <Drawer anchor='right' open={open} onClose={close}>
        {cart?.map(product => (
          <React.Fragment key={product.id}>
            <Grid
              container
              style={{
                padding: 8,
                width: 280,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Avatar alt={product.title} src={product.image} />
              </Grid>

              <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                <Typography
                  noWrap
                  variant='body2'
                  color='initial'
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {product.title}
                </Typography>
              </Grid>

              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <DeleteOutlineIcon onClick={() => removeFromCart(product)} />
              </Grid>

              <Grid item style={{ marginTop: 12 }}>
                <Typography variant='caption' color='darkgrey'>
                  Inventory: {product.rating?.count}
                </Typography>
              </Grid>

              <Grid item style={{ marginTop: 12 }}>
                <Typography variant='caption' color='green'>
                  {formatToBrlCurrency(product.price)}
                </Typography>
              </Grid>

              <Grid container style={{ alignItems: "center", justifyContent: "space-between" }}>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                  <IconButton onClick={() => changeQuantity(product, "minusOne")}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>

                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <Typography variant='body1' color='green'>
                    {product.quantity}
                  </Typography>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                  <IconButton onClick={() => changeQuantity(product, "plusOne")}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Divider />
          </React.Fragment>
        ))}

        <Grid container style={{ padding: 8, marginTop: "auto" }}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant='h6' color='green' align='left'>
              Total: {formatToBrlCurrency(calculateTotalValue())}
            </Typography>
          </Grid>
        </Grid>

        <Button
          size='large'
          color='success'
          variant='contained'
          disabled={cart.length === 0 || calculateTotalValue() === 0}
          onClick={() => {
            setTimeout(close, 0)
            setConclude(true)
          }}
          style={{ borderRadius: 0, justifyContent: "center" }}
        >
          Buy now
        </Button>
      </Drawer>

      <ConcludePurchase open={conclude} close={() => setConclude(false)} />
    </>
  )
}
