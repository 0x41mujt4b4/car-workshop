export default function FormExtra(){
    return(
        <div className="flex items-center justify-between">
        <div className="text-sm">
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            هل نسيت الباسورد ؟
          </a>
        </div>
        <div className="flex items-center">
          <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
            تذكرني
          </label>
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
        </div>

      </div>

    )
}