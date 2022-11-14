import React from "react";
import Search from "../components/Search";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button } from "@mui/material";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  const ShowCarsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:5000/cars");
    setProducts(await result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const confirm = (product) => {


    return confirmAlert({
      title: "الموافقة على الحذف",
      message: "هل أنت متأكد لحذف هذا العنصر ؟",
      buttons: [
        {
          label: "لا",
          onClick: () => null,
        },
        {
          label: "نعم",
        //   onClick: () => removeProduct(product),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const tableHead = [
      "تكلفة الصيانة",
      "إجمالي التكلفة",
      "اللون",
      "المالك",
      " نوع السيارة",
      "رقم اللوحة",
  ];
  const style = {
    th: "p-1 xs:p-1 md:p-2 xs:p-1",
    td: "p-1 md:p-2 hover:cursor-pointer text-sm",
  };
  return (
    <div className="h-full w-full bg-slate-300">
    <Header
                heading="دنبلاب لصيانة السيارات"
                customClass="h-20"
                // paragraph="الاسبيرات"
                // linkName="الرجوع للصفحة الرئيسية"
                // linkUrl="/home"
                />
    <div class="container mx-auto px-4">
    <div className="flex flex-row gap-2 justify-between md:px-20 lg:px-28 pb-4">
      <div className="flex gap-2">
        <Button variant='contained' color='secondary' size='small' onClick={()=>navigate('/home')}>رجوع للقائمة الرئيسية</Button>
        <Button variant="contained" size="small" onClick={() => navigate('/add_car')}>إضافة سيارة</Button>
      </div>
      <Search /> 
    </div>
      <div class="inline-grid w-full overflow-y-auto max-h-80 md:px-20 lg:px-28">
        <table className="table text-center">
          <thead className="bg-cyan-700 text-white top-0 sticky ">
            <tr>
              {tableHead.map((el) => (
                <th className={style.th}>{el}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              "loading .."
            ) : products ? (
              products.map((product, key) => (
                <tr
                  key={key}
                  className="bg-white rounded-[20px] active:bg-slate-200 border border-b-black"
                >
                  
                  <td
                    className={style.td}
                    // onClick={() => addProductToCard(product)}
                  >
                    {product.repair_cost}
                  </td>
                  <td
                    className={style.td}
                    // onClick={() => addProductToCard(product)}
                  >
                    {product.total_cost}
                  </td>
                  <td
                    className={style.td}
                    // onClick={() => addProductToCard(product)}
                  >
                    {product.color}
                  </td>
                  <td
                    className={style.td}
                    // onClick={() => addProductToCard(product)}
                  >
                    {product.owner}
                  </td>
                  <td
                    className={style.td}
                    // onClick={() => addProductToCard(product)}
                  >
                    {product.model}
                  </td>
                  <td
                    className={style.td}
                    // onClick={() => addProductToCard(product)}
                  >
                    {product.plate_no}
                  </td>
                </tr>
              ))
            ) : (
              <h2 className="text-red-300">لا يوجد منتج</h2>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default ShowCarsPage;
