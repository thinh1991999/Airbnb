import moment from "moment";

export const getTime = (value) => {
  let newValue = "";
  newValue = value ? moment(value).format("MM/DD/YYYY").toString() : "";
  return newValue;
};
