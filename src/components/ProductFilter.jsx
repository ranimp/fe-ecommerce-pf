import React from "react";
import Button from "./Button";

export default function ProductFilter() {
    return (
      <div className="font-poppins container mx-auto px-5 text-sm lg:text-base overflow-x-auto">
        <div className="flex lg:justify-center gap-4 cursor-pointer">
          <span className="font-semibold border-b-2 w-max text-center border-3F70F9">All</span>
          <span className="font-md">PC</span>
          <span className="font-md">Laptop</span>
          <span className="font-md">Handphone</span>  
          <span className="font-md">Tablet</span>  
          <span className="font-md">Accessories</span>
          <select
            id="show"
            className="form-select cursor-pointer"
            aria-label="Default select example"
          >
          <option value="" className="text-sm" selected>Sort by</option>
          <option value="name" className="text-sm">Name</option>
          <option value="rating" className="text-sm">Rating</option>
          </select>
          <Button def="def" type="navLogin">Submit</Button> 
        </div>
      </div>
    )
}