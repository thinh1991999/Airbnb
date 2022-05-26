import { store } from "../../../../Store/AppProvider";

function Rules() {
  // const language = store.getState().root.language;
  return [
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "The name field is required.",
    },
    {
      field: "province",
      method: "isEmpty",
      validWhen: false,
      message: "The province field is required.",
    },
    {
      field: "country",
      method: "isEmpty",
      validWhen: false,
      message: "The country field is required.",
    },
    {
      field: "valueate",
      method: "isEmpty",
      validWhen: false,
      message: "The valueate field is required.",
    },
    {
      field: "valueate",
      method: "isInt",
      validWhen: true,
      args: [{ min: 0, max: 10 }],
      message: "The valueate field is number(0-10).",
    },
  ];
}

export default Rules;
