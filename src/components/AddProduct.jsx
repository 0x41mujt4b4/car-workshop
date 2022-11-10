import React from 'react'

const AddProduct = ({setShowAddProduct}) => {
    const handleOnSave = () => {
        setShowAddProduct(prev => !prev)
        console.log("save")
    }

    const handleOnCancel = () => {
        setShowAddProduct(prev => !prev)
        console.log("canceled")
    }

    return (

        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center bg-gray-500">
          <form className="flex flex-col" action="" method="post">
            <div className="p-2">
              <input id="name" type="text" required />
              <label htmlFor=""> :الاسبير</label>
            </div>
            <div className="p-2">
              <input id="quantity" type="number" required />
              <label htmlFor=""> :الكمية</label>
            </div>
            <div className="p-2">
              <input id="sel_price" type="number" required />
              <label htmlFor=""> :سعر البيع</label>
            </div>
            <div className="p-2">
              <input id="pur_price" type="number" required />
              <label htmlFor=""> :سعر الشراء</label>
            </div>
          </form>
          <div className="flex flex-row justify-around">
            <div className="">
              <button
                type="button"
                onClick={() => handleOnCancel()}
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                الغاء
              </button>
            </div>
            <div className="">
              <button
                type="button"
                onClick={() => handleOnSave()}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      </div>

    );
}

export default AddProduct