import React, { useState, useEffect } from "react";
import validation from "../components/validation";
import Button from "../components/Button";
import NavbarHome from "../layouts/NavbarHome";
import ilustrasilogin from "../images/ilustrasilogin.png"
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [listUser, setListUser] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    listUser.forEach(user => {
      if (user.email === values.email && user.password === values.password && user.email.length >= 1) {
        setIsLogged(true)
        localStorage.setItem("credential", JSON.stringify(user))
        console.log("berhasil")
      } else {
        setIsFailed(true)
        console.log("login gagal")
      }
    setErrors(validation(values));
    })
  }

  useEffect(() => {
    fetch("https://pickled-capricious-beak.glitch.me/user")
      .then(response => response.json())
      .then(data => setListUser(data))
      .catch(err => console.log(err))
  },[listUser, values])
  
  return (
      <div className="h-screen bg-gradient-to-r from-3F70F9 via-4C79F9 to-69BAEC font-poppins">
        <div data-aos="fade" data-aos-duration="2000">
        <NavbarHome />
        </div>
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-6">
            <div className="hidden lg:block lg:col-span-3 my-6 ml-2" data-aos="fade-right" data-aos-duration="1500">
              <h1 className="text-center text-white lg:mx-40 text-lg font-bold">
                Hi,Welcome Back!
              </h1>
              <img className="hidden mr-16 lg:flex w-11/12" src={ilustrasilogin} alt="gambar"/>
            </div>
            <div className="col-span-1 lg:col-span-3 lg:my-6" data-aos="fade-left" data-aos-duration="1500">
            <h1 className="text-center text-white lg:mx-40 text-lg font-bold">
            Login
            </h1>
              <div className="w-11/12 mx-auto lg:w-6/12 mt-5 bg-B5C5F2 p-8 border border-gray-300 shadow-2xl rounded-2xl">
                {/* form */}
                <form className=" w-full mx-auto">
                  {/* email */}
                  <div className="mt-3">
                    <label className="label text-sm font-bold text-gray-700 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input text-xs w-full p-2 border border-gray-300 rounded mt-1 hover:border-blue-600"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                    ></input>
                    <div className="text-xs text-red-600">
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                  </div>

                  {/* password */}
                  <div className="mt-4">
                    <label className="label text-sm font-bold text-gray-700 block">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className=" input text-xs w-full p-2 border border-gray-300 rounded mt-1 hover:border-blue-600"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                    ></input>
                    {/* <button onClick={togglePassword}>Show Password</button> */}
                    <div className="text-xs text-red-600	">
                      {errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                  </div>
                  <div class="mb-4">
              <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                <label className="text-sm" for="checkbox_id">
                  Remember Me
                </label>
            </div>
                  {/* submit */}
                  <div>
                    {isFailed && (<div className="text-xs text-red-600 my-3">No Such Data</div>)}
                    <Button
                      def="default"
                      type="loginSignUpSend"
                      onClick={handleFormSubmit}
                    >
                      Login 
                      { isLogged && (<Redirect to="/"/>) }
                    </Button>
                  </div>
                  <div className="text-center my-3">
                <Link to="/login"
              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
              Forgot your Password?
                </Link>
            </div>
                  <div className="text-center lg:flex lg:justify-center mt-4">
                    <p className="inline-block text-sm text-black-500">
                      don't have an account yet?
                      <Link
                        className="px-2 inline-block text-sm text-blue-500 hover:text-blue-800"
                        to="/signup"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}