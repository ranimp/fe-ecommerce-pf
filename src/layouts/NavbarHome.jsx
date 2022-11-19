import React from "react";
import Logo from "../icons/Logo";
import {CartIconHome} from "../icons/CartIcon";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function NavbarHome({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="font-poppins sticky top-0 inset-x-0 z-50 flex flex-wrap items-center justify-between px-2 pt-2 pb-1 mb-3 bg-transparent">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start pb-1">
          <Logo/>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link
                className="lg:px-3 py-3 flex items-center text-lg capitalize font-medium leading-snug text-white hover:opacity-75"
                to="/"
              >
                <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="lg:px-3 py-3 flex items-center text-lg capitalize font-medium leading-snug text-white hover:opacity-75"
                to="/product"
              >
                <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">product</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="lg:px-3 py-3 flex items-center text-lg capitalize font-medium leading-snug text-white hover:opacity-75"
                to="/contact"
              >
                <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Contact</span>
              </Link>
            </li>
            <li className="nav-item w-72 lg:w-auto">
              <Link
                className="lg:px-3 py-3 lg:hidden items-center text-lg capitalize font-medium leading-snug text-white hover:opacity-75 grid grid-cols-12"
                to="/login"
              >
                <span className="ml-2 col-span-10">my carts</span>
                <span className="ml-1 text-white bg-3F70F9 rounded-full p-1 text-center">0</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="lg:px-3 py-2 lg:flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 hidden"
                to="/login"
              >
                <CartIconHome />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="lg:px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/signup"
              >
              <Button def="default" type="navSignUpWhite">Sign up</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="lg:px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/login"
              >
              <Button def="default" type="navLogin">Login</Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) 
}
