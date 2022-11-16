import React from "react";
import { useNavigate } from "react-router-dom";
const ButtonCard = ({ title, src, url}) => {
    const navigate = useNavigate()
  return (
    // <div className="flex flex-col">
      <div className="w-36 bg-slate-300 text-center m-2 p-2 transform cursor-pointer rounded-lg shadow-xl transition-all duration-200 active:-translate-y-1 active:shadow-none"
      onClick={() => navigate(url)}
      >
        <div className="flex w-16 items-center justify-center mx-auto">
        <img src={src} alt="" className="rounded-t-lg" />
        </div>
        {/* <div className="p-6"> */}
          <h2 className="mb-2 w-auto text-2xl font-bold">
            {title}
          </h2>
        {/* </div> */}
      </div>
    // </div>
  );
};

export default ButtonCard;
