import { orderBy } from "lodash"

export const sortPriceAsc = products => {
  return orderBy(products, "price", "asc")
}

export const sortPriceDesc = products => {
  return orderBy(products, "price", "desc")
}

export const sortAlphabetical = products => {
  return orderBy(products, "title")
}
