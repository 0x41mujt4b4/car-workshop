import {React, useState, useRef} from 'react'
import RegistrationDialog from "./RegistrationDialog"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid';

const AddProduct = ({setShowAddProduct}) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const plateNoRef = useRef()
  const modelRef = useRef()
  const ownerRef = useRef()
  const colorRef = useRef()
  const totalCostRef = useRef()
  const repairCostRef = useRef()
  
  const carFields = [
    {
      label: "تكلفة الصيانة",
      id: "repair_cost",
      type: "number",
      ref: repairCostRef
    },
    {
      label: "إجمالي التكلفة",
      id: "total_cost",
      type: "number",
      ref: totalCostRef
    },
    {
      label: "اللون",
      id: "color",
      type: "text",
      ref: colorRef
    },
    {
      label: "المالك",
      id: "owner",
      type: "text",
      ref: ownerRef
    },
    {
      label: "نوع السيارة",
      id: "type",
      type: "text",
      ref: modelRef
    },
    {
      label: "رقم اللوحة",
      id: "plate_no",
      type: "text",
      ref: plateNoRef
    },
  ];

    const handleOnSave = (e) => {
        e.preventDefault()
        const car = {
          id: uuid(),
          plate_no: plateNoRef.current.value,
          model: modelRef.current.value,
          owner: ownerRef.current.value,
          color: colorRef.current.value,
          total_cost: totalCostRef.current.value,
          repair_cost: repairCostRef.current.value
        }
        console.log(car)
        axios.post("http://localhost:5000/cars", car)
        .then(res => {
          console.log('posting data.. ', res)
          if (res.status === 201)
          navigate(-1)
        })
        .catch(err => console.log(err));
    }

    const handleOnCancel = () => {
        setOpen(false);
        console.log("canceled")
        navigate(-1);
    }

    return (
      <RegistrationDialog title="إضافة سيارة" fields={carFields} open={open} handleSubmit={handleOnSave} handleClose={handleOnCancel} />
    );
}

export default AddProduct