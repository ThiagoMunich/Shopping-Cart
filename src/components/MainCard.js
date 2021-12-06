import { makeStyles } from "@mui/styles"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Rating from "@mui/material/Rating"
import Tooltip from "@mui/material/Tooltip"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"

import useCart from "../hooks/useCart"
import { formatToBrlCurrency } from "../helpers/format"

const useStyles = makeStyles(theme => ({
  addToCart: {
    marginTop: 16,
    textTransform: "none",
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}))

export default function MainCard({ product }) {
  const classes = useStyles()

  const { cart, setCart } = useCart()

  const addToCart = () => {
    product["quantity"] = 1

    setCart([...cart, product])
  }

  const productAlreadyInCart = () => {
    const checkProduct = cart.find(item => item.id === product.id)

    if (checkProduct) return true
  }

  return (
    <>
      <Card sx={{ maxHeight: 600 }} raised>
        <CardMedia component='img' height='140' image={product.image} alt={product.title} />

        <CardContent>
          <Tooltip title={product.title} arrow>
            <Typography className={classes.text} gutterBottom variant='h6' noWrap>
              {product.title}
            </Typography>
          </Tooltip>

          <Typography className={classes.text} noWrap variant='body2' color='text.secondary'>
            {product.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Grid container direction='column'>
            <Grid
              container
              style={{ justifyContent: "space-between", alignItems: "center", marginTop: 16 }}
            >
              <Rating defaultValue={product.rating.rate} precision={0.5} readOnly />
              <Chip label={formatToBrlCurrency(product.price)} color='success' />
            </Grid>

            <Button
              fullWidth
              size='small'
              variant='contained'
              onClick={addToCart}
              className={classes.addToCart}
              disabled={productAlreadyInCart()}
            >
              Add to cart
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </>
  )
}
