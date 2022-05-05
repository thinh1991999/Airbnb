export const getVNDMoney = (price) => {
  const newPrice = price
    ? price?.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })
    : 0;
  return newPrice;
};
