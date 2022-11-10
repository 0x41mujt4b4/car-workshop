import React from "react";
import { useNavigate } from "react-router-dom";
const ButtonCard = ({ title, src, url }) => {
    const navigate = useNavigate()
  return (
    // <div class="flex flex-col">
      <div class="w-36 text-center m-2 p-2 transform cursor-pointer rounded-lg shadow-lg transition-all duration-200 active:-translate-y-1 active:shadow-none"
      onClick={() => navigate(url)}
      >
        <div className="flex w-16 items-center justify-center mx-auto">
        <img src={src} alt="" class="rounded-t-lg" />
        </div>
        {/* <div class="p-6"> */}
          <h2 class="mb-2 w-auto text-2xl font-bold text-purple-800">
            {title}
          </h2>
        {/* </div> */}
      </div>
    // </div>
  );
};

export default ButtonCard;
