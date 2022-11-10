import React from 'react'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Products = ({isLoading, products, addProductToCard, removeProduct}) => {
  const confirm = (product) => {
    return(
    confirmAlert({
    title: 'الموافقة على الحذف',
    message: 'هل أنت متأكد لحذف هذا العنصر ؟',
    buttons: [
      {
        label: 'لا',
        onClick: () => null
      },
      {
        label: 'نعم',
        onClick: () => removeProduct(product)
      }
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
  }))}

  const style = {
    th : "p-1 xs:p-1 md:p-2 xs:p-1",
    td : "p-1 md:p-2 hover:cursor-pointer text-sm"
  }
  return (
    <div class="inline-grid w-full overflow-y-auto max-h-80">
    <table className="table text-center">
      <thead className="bg-cyan-700 text-white top-0 sticky ">
        <tr>
          <th className={style.th}>العمليات</th>
          <th className={style.th}>سعر البيع</th>
          <th className={style.th}>سعر الشراء</th>
          <th className={style.th}>الكمية</th>
          <th className={style.th}>الحالة</th>
          <th className={style.th}>الاسبير</th>
        </tr>
      </thead>
      <tbody>
      {isLoading ? (
          "loading .."
        ) : (
        products ? (
          products.map((product, key) => (
          <tr key={key} className="bg-white rounded-[20px] active:bg-slate-200 border border-b-black">
            <td className="p-2 md:p-2">
              <div className="flex flex-row">
              <button
                className="text-red-400 hover:text-white hover:bg-red-400 border border-red-400 rounded text-xs p-[2px]"
                onClick={() => confirm(product)}
              >
                  حذف <DeleteOutlinedIcon sx={{fontSize: 14 }}/>
                {/* <i className="text-base">
                </i> */}
              </button>
              <button
                className="text-blue-400 hover:text-white border border-blue-400 rounded hover:bg-blue-400 mx-1 text-xs p-[2px]"
              >
                  تعديل <EditOutlinedIcon sx={{fontSize: 14 }} />
                {/* <i className="text-base">
                </i> */}
              </button>
              <button
                className="text-slate-700 hover:text-white border border-slate-700 rounded hover:bg-slate-700 text-xs p-[2px]"
              >
                  عرض <VisibilityOutlinedIcon sx={{fontSize: 14 }}/>
                {/* <i className="text-base">
                </i> */}
              </button>
              </div>
            </td>
            <td className={style.td} onClick={() => addProductToCard(product)}>{product.sell_price}</td>
            <td className={style.td} onClick={() => addProductToCard(product)}>{product.buy_price}</td>
            <td className={style.td} onClick={() => addProductToCard(product)}>{product.quantity}</td>
            <td className={style.td} onClick={() => addProductToCard(product)}>
              <span className="bg-green-400 text-gray-50 rounded-md px-2">
                {product.status}
              </span>
            </td>
            <td className={style.td} onClick={() => addProductToCard(product)}>
              {product.name}
            </td>
          </tr>
          ))
          ) : (
            <h2 className='text-red-300'>لا يوجد منتج</h2>
          )
          )}
      </tbody>
    </table>
  </div>
  )
}

export default Products