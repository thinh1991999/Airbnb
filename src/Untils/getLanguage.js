import { ELLanguage, VNLanguage } from "../Languages";

export const getLanguage = (type) => {
  switch (type) {
    case "UL":
      return ELLanguage;
    default:
      return VNLanguage;
  }
};
