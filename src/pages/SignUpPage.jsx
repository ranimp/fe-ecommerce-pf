import React, { useState, useEffect } from "react";
import validation from "../components/validation";
import Button from "../components/Button";
import NavbarHome from "../layouts/NavbarHome";
import SignUpIcon from "../icons/SignUpIcon";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router";


export default function SignUp() {
  const [values, setValues] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const history = useHistory()

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("https://pickled-capricious-beak.glitch.me/user",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      if(data.email) {
        console.log(data,"Sukses menambahkan")
        history.push("/login")
      } else {
        setErrors(validation(values));
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-3F70F9 via-4C79F9 to-69BAEC font-poppins">
        <div data-aos="fade" data-aos-duration="2000">
        <NavbarHome />
        </div>

        <div className="container mx-auto px-5" >
          <div className="grid grid-cols-1 lg:grid-cols-6">
            {/* kiri */}
            <div className="hidden lg:block lg:col-span-3 my-8 mx-auto" data-aos="fade-right" data-aos-duration="1500">
              <h1 className="text-center text-white lg:mx-40 text-lg font-bold">
                Lets Get Started!
              </h1>
              <SignUpIcon />
            </div>

            {/* kanan */}
            <div className="h-screen col-span-1 lg:col-span-3 my-8" data-aos="fade-left" data-aos-duration="1500">
              <h1 className="text-center text-white lg:mx-40 text-lg font-bold">
                Sign Up Now
              </h1>
              <div className="w-full mx-auto lg:w-8/12 mt-4 bg-B5C5F2 p-8 border border-gray-300 shadow-2xl rounded-2xl">
                {/* form */}
                <form className=" w-full mx-auto">
                  {/* name */}
                  <div>
                    <label className="label text-sm font-bold text-gray-700 block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="input text-xs w-full p-2 border border-gray-300 rounded mt-1 hover:border-blue-600"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                    ></input>
                    <div className="text-xs text-red-600	">
                      {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                  </div>

                  {/* gender */}
                  <div className="mt-4">
                    <label className="label text-sm font-bold text-gray-700 block">
                      Gender
                    </label>
                    <label className="inline-flex items-center label text-sm font-bold text-gray-700">
                      <input
                        type="radio"
                        className="form-radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                      />
                      <label className="ml-2 text-xs">Male</label>
                    </label>
                    <label className="inline-flex items-center ml-4 label text-sm font-bold text-gray-700">
                      <input
                        type="radio"
                        className="form-radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                      />
                      <label className="ml-2 text-xs">Female</label>
                    </label>
                    <div className="text-xs text-red-600	">
                      {errors.gender && (
                        <p className="error">{errors.gender}</p>
                      )}
                    </div>
                  </div>

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
                    <div className="text-xs text-red-600	">
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

                  {/* confir password */}
                  <div className="mt-4">
                    <label className="label text-sm font-bold text-gray-700 block">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className=" input text-xs w-full p-2 border border-gray-300 rounded mt-1 hover:border-blue-600"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter Your Confirm Password"
                    ></input>{" "}
                    <div className="text-xs text-red-600	">
                      {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* submit */}
                  <div className="mt-8">
                      <Button
                      def="default"
                      type="loginSignUpSend"
                      onClick={handleFormSubmit}
                    >Sign Up</Button>
                  </div>
        
                  <div className="text-center lg:flex lg:justify-center mt-4">
                    <p className="inline-block text-sm text-black-500">
                      already have an account?
                      <Link
                        className="px-2 inline-block text-sm text-blue-500 hover:text-blue-800"
                        to="/login"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
