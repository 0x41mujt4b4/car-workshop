export default function FormExtra(){
    return(
        <div className="flex items-center justify-between">
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            هل نسيت الباسورد ؟
          </a>
        </div>
        <div className="flex items-center">
          <label htmlFor="remember-me" className="mr-2 block text-sm">
            تذكرني
          </label>
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

      </div>

    )
}