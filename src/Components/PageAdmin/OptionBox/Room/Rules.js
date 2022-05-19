function Rules() {
  return [
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "The name field is required.",
    },
    {
      field: "price",
      method: "isEmpty",
      validWhen: false,
      message: "The price field is required.",
    },
    {
      field: "price",
      method: "isInt",
      validWhen: true,
      args: [{ min: 0 }],
      message: "The price field is a number >= 0.",
    },
    {
      field: "guests",
      method: "isEmpty",
      validWhen: false,
      message: "This guests field is required.",
    },
    {
      field: "guests",
      method: "isInt",
      validWhen: true,
      message: "The guests field is a number.",
    },
    {
      field: "bedRoom",
      method: "isEmpty",
      validWhen: false,
      message: "This bedRoom field is required.",
    },
    {
      field: "bedRoom",
      method: "isInt",
      validWhen: true,
      message: "The bedRoom field is a number.",
    },
    {
      field: "bath",
      method: "isEmpty",
      validWhen: false,
      message: "This bath field is required.",
    },
    {
      field: "bath",
      method: "isInt",
      validWhen: true,
      message: "The bath field is a number.",
    },
    {
      field: "description",
      method: "isEmpty",
      validWhen: false,
      message: "The description field is required.",
    },
    {
      field: "locationId",
      method: "isEmpty",
      validWhen: false,
      message: "The location field is required.",
    },
  ];
}

export default Rules;
