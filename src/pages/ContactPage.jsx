import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import FbIcon from "../icons/FbIcon"
import IgIcon from "../icons/IgIcon";
import TwitterIcon from "../icons/TwitterIcon";
import logoContact from "../images/logoContact.png"
import validation from "../components/validation";
import Navbar from "../layouts/NavbarNoLogin";
import NavbarLogin from "../layouts/NavbarLogin";
import Footer from "../layouts/Footer";
import success from "../images/success.gif";


export default function ContactPage(){

    const [user, setUser] = useState()
    const [showModal, setShowModal] = useState(false);
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("credential");
        if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
        }
    }, []);

    const [values, setValues] = useState({
        name: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (values.name.length >= 1 && values.message.length >= 1) {
          setShowModal(true)
        } else {
          console.log("pesan gagal")
          setErrors(validation(values));
        }
    };

    return(
        
    <div>
        {user ?
        <NavbarLogin /> :
        <Navbar />}
        {showModal && (
            <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h5 className="ml-10 text-xl font-normal">
                    Your message was sent successfully!
                    </h5>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                    <img className="mx-auto w-48"src={success} alt="success"></img>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        )}
        <div className="container mx-auto px-5 my-20" data-aos="zoom-in" data-aos-duration="1500">
            <div className="flex justify-center">
                <div className="bg-B5C5F2 lg:p-8 border border-gray-300 shadow-2xl rounded-2xl">
                    <div className="mx-auto sm:px-6 lg:px-8">
                        <div className="mt-2 overflow-hidden">
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <form className="ml-8 flex flex-col justify-center mr-10 ">
                                    <div className="flex flex-col mb-4 mt-5 lg:mt-0">
                                        <label for="name" className="label text-sm font-bold text-gray-700 block">Full
                                            Name</label>
                                        <input type="name" name="name" id="name" value={values.name} onChange={handleChange}
                                            placeholder="Enter Your Name"
                                            class="w-100 mt-2 py-2 px-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-400 text-gray-800 focus:border-indigo-500 focus:outline-none" />
                                        <div className="text-xs text-red-600">
                                            {errors.email && <p className="error">{errors.name}</p>}
                                        </div>
                                    </div>
                                    <div class="relative mb-4">
                                        <label for="message"
                                            className="label text-sm font-bold text-gray-700 block">Message</label>
                                        <textarea id="message" name="message" value={values.message} onChange={handleChange}
                                            placeholder="Write a message..."
                                            class="w-full bg-white rounded-lg border border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-56 text-base outline-none text-gray-800 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                        <div className="text-xs text-red-600">
                                            {errors.message && <p className="error">{errors.message}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                        <Button def="default" type="loginSignUpSend" onClick={handleFormSubmit} >Submit</Button>
                                    </div>
                                    


                                </form>

                                <div className="p-4 mx-5 my-10 bg-gray-100 dark:bg-gray-800">
                                    <h1
                                        className=" text-xl lg:text-4xl text-gray-800 dark:text-white font-semibold tracking-tight ">
                                        Gadget Online Shop
                                    </h1>
                                    <div className=" hidden lg:block w-full px-8 my-5">
                                        <img src={logoContact} alt="logocontact" />
                                    </div>
                                    <div className="text-md tracking-wide font-semibold">
                                        <p>Find us</p>
                                    </div>
                                    <div className="flex items-center mt-4 text-black-600 dark:text-gray-400">
                                        <IgIcon />
                                        <div className="ml-4 text-md tracking-wide font-semibold">
                                            @gos.official
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-4 text-black-600 dark:text-gray-400">
                                        <FbIcon />
                                        <div className="ml-4 text-md tracking-wide font-semibold">
                                            g-os official
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-2 text-black-600 dark:text-gray-400">
                                        <TwitterIcon />
                                        <div className="ml-4 text-md tracking-wide font-semibold">
                                            @gos.official
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
}