import { React, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const Table = ({ cart, totalAmount, removeProductFromCart }) => {
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const componentRef = useRef();

  const handlePrint = () => {
    handleReactToPrint();
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded p-2">
      <div style={{ display: "none" }}>
          <ComponentToPrint
          cart={cart}
          totalAmount={totalAmount}
          ref={componentRef}
          />
      </div>
      <div>
      <h2 className="text-2xl text-center sticky border-b-2 border-slate-500 mb-2">الفاتورة</h2>
      <div className="inline-grid w-full overflow-y-auto max-h-48 box-content">
        <table className="table-fixed overflow-scroll">
          <thead className="lg:text-sm text-xs bg-cyan-700 text-white sticky top-0">
            <tr>
              <th scope="col" className="p-1">
                <span className="">حذف</span>
              </th>
              <th scope="col" className="p-1">
                الإجمالي
              </th>
              <th scope="col" className="p-1">
                السعر
              </th>
              <th scope="col" className="p-1">
                الكمية
              </th>
              <th scope="col" className="p-1">
                الإسم
              </th>
            </tr>
          </thead>
          <tbody>
            {cart
              ? cart.map((cartProduct, key) => (
                  <tr key={key} className="border-b border-black hover:bg-slate-200 text-center">
                    <td class="py-1 px-1 text-xs">
                    <button
                    className="text-red-400 hover:text-red-500"
                    type="button"
                    onClick={() => removeProductFromCart(cartProduct)} 
                  >
                    <ClearOutlinedIcon />
                  </button>
                    </td>
                    <td class="py-1 px-1 text-xs">{cartProduct.totalAmount}</td>
                    <td class="py-1 px-1 text-xs">{cartProduct.sell_price}</td>
                    <td class="py-1 px-1 text-xs">{cartProduct.quantity}</td>
                    <td
                      class="py-1 px-1 text-xs"
                    >
                      {cartProduct.name}
                    </td>
                  </tr>
                ))
              : "لا يوجد منتج"}
          </tbody>
        </table>
      </div>
      </div>
      <div className="">
        <h2 className="text-xl text-center my-2"> <span className="text-cyan-800">{totalAmount}</span> :السعر الكلي</h2>
        <div className="flex justify-center">
              <button className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-1 px-2 rounded" onClick={() => handlePrint()}>
                إستخراج الفاتورة
              </button>
          {/* {totalAmount !== 0 ? (
            <div>
            </div>
          ) : (
            "Please add a product to the cart"
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Table;
