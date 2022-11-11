import React from 'react'

const Search = () => {
  return (
    <form class="flex items-center">
        <label for="simple-search" class="sr-only">
          بحث
        </label>
        <div class="relative w-auto h-auto">
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            dir="rtl"
            type="text"
            class="block w-full border outline-none focus:shadow-lg rounded-lg bg-gray-50 px-10 py-1 text-sm"
            placeholder="بحث"
            required
          />
        </div>
      </form>
  )
}

export default Search