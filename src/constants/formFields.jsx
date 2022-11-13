const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"البريد الإلكتروني"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"كلمة السر"   
    }
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]

const carFields = [
    {
      label: "تكلفة الصيانة",
      id: "repair_cost",
      type: "number",
    },
    {
      label: "إجمالي التكلفة",
      id: "total_cost",
      type: "number",
    },
    {
      label: "اللون",
      id: "color",
      type: "text",
    },
    {
      label: "المالك",
      id: "owner",
      type: "text",
    },
    {
      label: "نوع السيارة",
      id: "type",
      type: "text",
    },
    {
      label: "رقم اللوحة",
      id: "type",
      type: "text",
    },
  ];

  const itemFields = [
    {
      label: "الاسبير",
      id: "item",
      type: "text",
    },
    {
      label: "الحالة",
      id: "condition",
      type: "text",
    },
    {
      label: "الكمية",
      id: "quantity",
      type: "number",
    },
    {
      label: "سعر الشراء",
      id: "item_sell_price",
      type: "number",
    },
    {
      label: "سعر البيع",
      id: "item_buy_price",
      type: "number",
    },
  ]

export {loginFields,signupFields, carFields, itemFields}