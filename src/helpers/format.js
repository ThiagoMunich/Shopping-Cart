export const formatToBrlCurrency = value => {
  if (value !== null && value !== undefined)
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(value)

  return ""
}
