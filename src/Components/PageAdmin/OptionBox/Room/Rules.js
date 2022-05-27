import { store } from "../../../../Store/AppProvider";

function Rules() {
  const language = store.getState().root.language;
  return [
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: language.nameRequired,
    },
    {
      field: "price",
      method: "isEmpty",
      validWhen: false,
      message: language.priceRequired,
    },
    {
      field: "price",
      method: "isInt",
      validWhen: true,
      args: [{ min: 0 }],
      message: language.priceRange,
    },
    {
      field: "guests",
      method: "isEmpty",
      validWhen: false,
      message: language.guestsRequired,
    },
    {
      field: "guests",
      method: "isInt",
      validWhen: true,
      message: language.guestsNumber,
    },
    {
      field: "bedRoom",
      method: "isEmpty",
      validWhen: false,
      message: language.bedRoomRequired,
    },
    {
      field: "bedRoom",
      method: "isInt",
      validWhen: true,
      message: language.bedRoomNumber,
    },
    {
      field: "bath",
      method: "isEmpty",
      validWhen: false,
      message: language.bathRequired,
    },
    {
      field: "bath",
      method: "isInt",
      validWhen: true,
      message: language.bathNumber,
    },
    {
      field: "description",
      method: "isEmpty",
      validWhen: false,
      message: language.descriptionRequired,
    },
    {
      field: "locationId",
      method: "isEmpty",
      validWhen: false,
      message: language.locationRequired,
    },
  ];
}

export default Rules;
