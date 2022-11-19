import React, {useState, useEffect} from "react";
import jumbotron from "../images/jumbotron.png"
import gambar from "../images/gbr.gif"
import Footer from "../layouts/Footer";
import NavbarHome from "../layouts/NavbarHome"
import NavbarHomeLogin from "../layouts/NavbarHomeLogin"
import Card from "../components/Card"
import { Link } from "react-router-dom";

export default function Homepage() {
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
      {/* section jumbotron */}
      <div className="bg-gradient-to-r from-3F70F9 via-4C79F9 to-69BAEC font-poppins mb-12 lg:mb-20">
        <div data-aos="fade" data-aos-duration="1500">
        {user ? <NavbarHomeLogin /> : <NavbarHome />}
        </div>
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="col-span-1 lg:col-span-3 my-8 lg:my-36" data-aos="fade-right" data-aos-duration="1500">
              <h1 className="font-extrabold text-4xl lg:text-6xl text-white">Gadget Online Shop</h1>
              <p className="text-2xl lg:text-3xl font-thin text-white my-4">Find your favorite gadget in our online shop</p>
              <Link to="/product" className="text-white text-base lg:text-xl underline"><span>Find here
              <svg className="ml-2 w-5 h-5 inline-block underline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg></span>
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:col-span-2 my-8 mx-auto" data-aos="fade-left" data-aos-duration="1000">
              <img src={jumbotron} alt="homepic" />
            </div>
          </div>
        </div>
      </div>
      {/* section about */}
      <div className="font-poppins container mx-auto px-5 lg:px-0 mb-12 lg:mb-36" data-aos="fade-up" data-aos-duration="1500">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:col-span-1 flex justify-center lg:items-center">
            <img src={gambar} alt="gambar"></img>
          </div>
          <div className="lg:col-span-1">
            <h3 className="font-extrabold text-2xl lg:text-4xl mt-10">Selling Product Since 2019</h3>
            <p className="text-sm lg:text-lg font-thin my-6 lg:my-12">Gadget Online Shop is an electronic trading company or often called an online shop. Since its founding in 2009, Gadget Online Shop has transformed into a unicorn that is influential not only in Indonesia but also in Southeast Asia.</p>
            <div className="grid grid-cols-3">
              <div className="col-span-1 text-center">
                <p className="text-md lg:text-2xl font-semibold mr-5">2019</p>
                <p className="text-xs lg:text-lg font-thin mr-5 capitalize">founded</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-md lg:text-2xl font-semibold mr-5">1000+</p>
                <p className="text-xs lg:text-lg font-thin mr-5 capitalize">products</p>
              </div>
              <div className="col-span-1 text-center">
                <p className="text-md lg:text-2xl font-semibold mr-5">99.9%</p>
                <p className="text-xs lg:text-lg font-thin mr-5 capitalize">satisfied costumer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section cards */}
      <div data-aos="fade-up" data-aos-duration="1500">
        <Card/>
      </div>
      {/* section footer */}
      <Footer/>
    </>
  );
}
