import { useState } from "react"

import Badge from "@mui/material/Badge"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

import Sidebar from "./Sidebar"
import useCart from "../hooks/useCart"

export default function ButtonAppBar() {
  const { cart } = useCart()

  const [sidebar, setSidebar] = useState(false)

  const handleSidebar = () => {
    setSidebar(!sidebar)
  }

  return (
    <>
      <AppBar color='inherit' position='sticky' style={{ marginBottom: 12 }}>
        <Toolbar>
          <Typography variant='h5' sx={{ flexGrow: 1, fontWeight: 700, color: "#000" }}>
            K. SHOP
          </Typography>

          <IconButton color='inherit' onClick={handleSidebar} disabled={!cart?.length}>
            <Badge color='error' badgeContent={cart?.length}>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Sidebar open={sidebar} close={handleSidebar} />
    </>
  )
}
