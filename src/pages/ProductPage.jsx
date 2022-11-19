import React, {useEffect, useState} from "react";
import Navbar from "../layouts/NavbarNoLogin";
import NavbarLogin from "../layouts/NavbarLogin";
import Card from "../components/Card";
import Footer from "../layouts/Footer";

export default function ProductPage() {
  const [user, setUser] = useState()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("credential");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      {user ? <NavbarLogin /> : <Navbar />}
      <div className="font-poppins container mx-auto px-5 mb-12 lg:mb-12">
        {/* section 1 */}
        <h1 className="font-extrabold text-2xl md:text-5xl mt-12 text-center" data-aos="fade" data-aos-duration="2000">Latest Products</h1>
      </div>
      <div data-aos="fade-up" data-aos-duration="1500">
        <Card />
      </div>
      <Footer/>
    </>
  )
}