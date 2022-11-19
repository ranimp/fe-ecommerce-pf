import React, {useEffect, useState} from "react";
import NavbarLogin from "../layouts/NavbarLogin";
import Footer from "../layouts/Footer";
import checkout from "../images/checkout.gif";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { useHistory } from "react-router";

export default function CheckoutSuccess() {
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("credential");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      history.push('/login') }
  }, []);

  return (
    <>
    {user && 
      <div>
        <NavbarLogin />
        <div className="container mx-auto px-5 font-poppins">
          <div className="grid grid-cols-1 lg:grid-cols-6">
            {/* kiri */}
            <div className="block lg:col-span-3 mx-auto w-full md:w-3/5 lg:w-full" data-aos="fade-right" data-aos-duration="2000">
              <img src={checkout} alt="CheckoutSuccess"></img>
            </div>

            {/* kanan */}
            <div className="col-span-1 lg:col-span-3 my-8 lg:my-48 md:text-center -mt-8 mb-40 sm:mb-12" data-aos="fade-left" data-aos-duration="2000">
              <div>
                <p className="text-2xl lg:text-3xl">
                  Thanks for order!
                  <br />
                  Please complete your transaction in the new tab that shown on your browser
                </p>
                <br />
                <Link to="/" className="text-sm md:text-xl underline">
                  Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>}
    </>
  );
}
