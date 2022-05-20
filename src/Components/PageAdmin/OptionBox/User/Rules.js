function Rules() {
  return [
    {
      field: "birthday",
      method: "isEmpty",
      validWhen: false,
      message: "The birthday field is required.",
    },
    {
      field: "address",
      method: "isEmpty",
      validWhen: false,
      message: "The address field is required.",
    },
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "The name field is required.",
    },
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: "The email field is required.",
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "This field is email.",
    },
    {
      field: "phone",
      method: "isEmpty",
      validWhen: false,
      message: "The phone field is required.",
    },
    {
      field: "phone",
      method: "isMobilePhone",
      args: [""],
      validWhen: true,
      message: "The field is phone number.",
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "The password field is required.",
    },
    {
      field: "cfPassword",
      method: "isEmpty",
      validWhen: false,
      message: "The comfirm password field is required.",
    },
  ];
}

export default Rules;
