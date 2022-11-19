import React from "react";
import FbIcon from "../icons/FbIcon"
import IgIcon from "../icons/IgIcon"
import TwitterIcon from "../icons/TwitterIcon"


export default function Footer() {
    return (
      <div className="bg-B5C5F2 font-poppins py-2">
        <div className=" flex justify-center gap-6 py-2">
          <IgIcon />
          <FbIcon/>
          <TwitterIcon />
        </div>
        <p className="block text-center">© Gadget Online Shop 2021. All Rights Reserved.</p>
      </div>
    )
}