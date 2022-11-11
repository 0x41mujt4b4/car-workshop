import React from 'react'

const Button = ({title}) => {
  return (
    <button class="rounded bg-blue-700 px-2 font-bold text-white hover:bg-blue-600">
        {title}
    </button>
  )
}

export default Button