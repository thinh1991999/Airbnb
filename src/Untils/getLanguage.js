import { ELLanguage, VNLanguage } from "../Languages";

export const getLanguage = (type) => {
  switch (type) {
    case "US":
      return ELLanguage;
    default:
      return VNLanguage;
  }
};
