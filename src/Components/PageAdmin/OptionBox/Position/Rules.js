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
      field: "province",
      method: "isEmpty",
      validWhen: false,
      message: language.provinceRequired,
    },
    {
      field: "country",
      method: "isEmpty",
      validWhen: false,
      message: language.countryRequired,
    },
    {
      field: "valueate",
      method: "isEmpty",
      validWhen: false,
      message: language.valueateRequired,
    },
    {
      field: "valueate",
      method: "isInt",
      validWhen: true,
      args: [{ min: 0, max: 10 }],
      message: language.valueateRange,
    },
  ];
}

export default Rules;
