import React from 'react';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart, totalAmount} = props;
    return (
      <div ref={ref} className="p-5">
        <h2 className="">الفاتورة</h2>
      <div className="">
        <table className="">
          <thead className="">
            <tr>
              <th scope="col" className="py-1 px-1">
                الإجمالي
              </th>
              <th scope="col" className="py-1 px-1">
                سعر البيع
              </th>
              <th scope="col" className="py-1 px-1">
                الكمية
              </th>
              <th scope="col" className="py-1 px-1">
                الإسم
              </th>
            </tr>
          </thead>
          <tbody>
            {cart
              ? cart.map((cartProduct, key) => (
                  <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-1 px-1">{cartProduct.totalAmount}</td>
                    <td className="py-1 px-1">{cartProduct.price}</td>
                    <td className="py-1 px-1">{cartProduct.quantity}</td>
                    <th
                      scope="row"
                      className="py-1 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {cartProduct.name}
                    </th>
                  </tr>
                ))
              : "لا يوجد منتج"}
          </tbody>
        </table>
        <h2 className="text-bold text-lg text-center">{totalAmount} :السعر الكلي</h2>
      </div>
      </div>
    );
  });