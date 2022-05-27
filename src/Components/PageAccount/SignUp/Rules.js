import { store } from "../../../Store/AppProvider";

function Rules() {
  const language = store.getState().root.language;
  return [
    {
      field: "birthday",
      method: "isEmpty",
      validWhen: false,
      message: language.birthdayRequired,
    },
    {
      field: "address",
      method: "isEmpty",
      validWhen: false,
      message: language.addressRequired,
    },
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: language.nameRequired,
    },
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: language.emailRequired,
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: language.emailChecked,
    },
    {
      field: "phone",
      method: "isEmpty",
      validWhen: false,
      message: language.phoneRequired,
    },
    {
      field: "phone",
      method: "isMobilePhone",
      args: [""],
      validWhen: true,
      message: language.phoneChecked,
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: language.passwordRequired,
    },
    {
      field: "cfPassword",
      method: "isEmpty",
      validWhen: false,
      message: language.cfPasswordRequired,
    },
  ];
}

export default Rules;
