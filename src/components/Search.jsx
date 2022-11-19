import React from "react";

export function SearchHome({onChange, value}){
  return (
    <>
      <input
      type="text"
      placeholder="Search"
      className="py-1 placeholder-white text-white relative bg-B5C5F2 text-base outline-none focus:outline-none focus:ring w-full md:w-52 pl-5 filter drop-shadow-3xl rounded-full"
      onChange = {onChange}
      value = {value}/>
    </>
  )
}