import React from "react"

import { useEffect, useState } from "react"

import axios from "axios"

import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import Header from "./components/Header"
import MainCard from "./components/MainCard"
import CartProvider from "./context/CartContext"
import BackdropLoading from "./components/BackdropLoading"
import { sortAlphabetical, sortPriceAsc, sortPriceDesc } from "./helpers/sort"

const sortingOptions = [
  { name: "Increasing", option: sortPriceAsc },
  { name: "Decreasing", option: sortPriceDesc },
  { name: "Alphabetical", option: sortAlphabetical },
]

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(response => setProducts(response.data))
  }, [])

  const renderChips = option => {
    return (
      <Chip
        color='secondary'
        variant='outlined'
        label={option.name}
        onClick={() => setProducts(option.option)}
      />
    )
  }

  return (
    <>
      <CartProvider>
        <Header />

        {products.length === 0 ? (
          <BackdropLoading open={true} />
        ) : (
          <>
            <Grid container justifyContent='space-between' style={{ marginBottom: 24 }}>
              {sortingOptions.map(option => (
                <div key={option.name}>{renderChips(option)}</div>
              ))}
            </Grid>

            <Grid container spacing={8}>
              {products?.map(product => (
                <Grid key={product.id} item xl={4} lg={4} md={4} sm={6} xs={12}>
                  <MainCard key={product.id} product={product} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </CartProvider>
    </>
  )
}

export default App
