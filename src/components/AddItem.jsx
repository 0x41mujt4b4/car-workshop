import { React, useState, useRef } from "react";
import RegistrationDialog from "./RegistrationDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";

const AddProduct = ({ setShowAddProduct }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const itemRef = useRef();
  const statusRef = useRef();
  const quantityRef = useRef();
  const itemSellPriceRef = useRef();
  const itemBuyPriceRef = useRef();

  const itemFields = [
    {
      label: "الاسبير",
      id: "item",
      type: "text",
      ref: itemRef,
    },
    {
      label: "الحالة",
      id: "condition",
      type: "text",
      ref: statusRef,
    },
    {
      label: "الكمية",
      id: "quantity",
      type: "number",
      ref: quantityRef,
    },
    {
      label: "سعر الشراء",
      id: "item_sell_price",
      type: "number",
      ref: itemSellPriceRef,
    },
    {
      label: "سعر البيع",
      id: "item_buy_price",
      type: "number",
      ref: itemBuyPriceRef,
    },
  ];

  const handleOnSave = (e) => {
    e.preventDefault();
    const item = {
      id: uuid(),
      name: itemRef.current.value,
      status: statusRef.current.value,
      quantity: quantityRef.current.value,
      sell_price: itemSellPriceRef.current.value,
      buy_price: itemBuyPriceRef.current.value,
    };
    console.log(item);
    axios
      .post("http://localhost:5000/products", item)
      .then((res) => {
        console.log("posting data.. ", res);
        if (res.status === 201) navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  const handleOnCancel = () => {
    setOpen(false);
    console.log("canceled");
    navigate(-1);
  };

  return (
    <RegistrationDialog
      title="إضافة اسبير"
      fields={itemFields}
      open={open}
      handleSubmit={handleOnSave}
      handleClose={handleOnCancel}
    />
  );
};

export default AddProduct;
