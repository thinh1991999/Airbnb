import moment from "moment";

export const getInforSearchValue = (hint, searchValue) => {
  let newValue = "";
  if (hint === "checkIn" || hint === "checkOut") {
    newValue = searchValue[hint]
      ? moment(searchValue[hint]).format("MM/DD/YYYY").toString()
      : "";
  } else if (hint === "members") {
    const countNL = searchValue[hint]?.NL ? searchValue[hint]?.NL : 0;
    const countTE = searchValue[hint]?.TE ? searchValue[hint]?.TE : 0;
    const countEB = searchValue[hint]?.EB ? searchValue[hint]?.EB : 0;
    const countTC = searchValue[hint]?.TC ? searchValue[hint]?.TC : 0;
    newValue =
      countNL || countTE || countEB || countTC
        ? `${countNL + countTE > 0 ? `${countNL + countTE} khách` : ``}${
            countEB > 0 ? `,${countEB} em bé` : ""
          }${countTC > 0 ? `,${countTC} thú cưng` : ""} `
        : "";
  }
  return newValue;
};
