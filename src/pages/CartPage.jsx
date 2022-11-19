import React, {useEffect, useState} from "react";
import Button from "../components/Button";
import IncDec from "../components/ButtonIncDec";
import Footer from "../layouts/Footer";
import NavbarLogin from "../layouts/NavbarLogin";
import { useSelector, useDispatch } from "react-redux";
import {clearCart, delCart, addCart, removeCart} from '../redux/action';
import { useHistory } from "react-router";

export default function Cart(){
  const state = useSelector((state)=> state.handleCart)
  const dispatch = useDispatch()
  const history = useHistory()
  
  const [user, setUser] = useState()
  const [userName, setUserName] = useState('user')
  const [userEmail, setUserEmail] = useState('Challenger@gmail.com')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("credential");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser)
      setUserName(foundUser.name)
      setUserEmail(foundUser.email)
    } else {
      history.push('/login') }
  }, []);

  
  useEffect(() => {
    const reduceTotal = state.reduce((price, item) => Number(price) + Number(item.qty) * Number(item.price), 0)
    setAmount(reduceTotal)
  })

  const handleDel = (item) => {
      dispatch(delCart(item))
  }
  const handleAdd = (item) => {
      dispatch(addCart(item))
  }
  const handleRemove = (item) => {
      dispatch(removeCart(item))
  }
  
  const handleCheckout = async () => {
    console.log('ini kepanggil......');
    const chars ='abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for ( let i = 0; i < 20; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    const responseServer = await fetch('https://spiny-vivacious-flat.glitch.me/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "order_id": `Transakti-${result}`,
        "gross_amount": `${amount}`,
        "first_name": `${userName}`,
        "last_name": "",
        "email": `${userEmail}`,
        "phone": "-"
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
      return data
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    console.log('ini setelah manggil')
    console.log(responseServer)
    window.open(responseServer.redirect_url)
    dispatch(clearCart())
    history.push("/success")
  };

  const emptyCart = () => {
    return(
      <div className="container h-screen mx-auto px-5" data-aos="fade-right" data-aos-duration="1500">
        <div className="font-semibold py-5">
            <h3>Your Cart is Empty</h3>
        </div>
      </div>
    )
}

  const cartItems = (product) => {
    return(
      <>
          {/* map disini */}
          <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
            <div className="col-span-1">
              <img className="h-40 lg:h-72 mx-auto" src={product.image_url} alt="gambar"></img>
            </div>
            <div className="col-span-3 md:ml-12">
              <h3 className="font-bold text-sm md:text-xl lg:mt-12">{product.name}</h3>
              <div className="my-2 capitalize">stock : {product.stock}</div>
              <p className="mb-2 text-sm md:text-base">Rp {new Intl.NumberFormat(['ban', 'id']).format(product.price)}</p>
              <div className="inline-block">
                <IncDec onClick={()=>handleDel(product)}>-</IncDec>
              </div>
              <span className="inline-block px-6">{product.qty}</span>
              <div className="inline-block w-8">
                <IncDec onClick={() => handleAdd(product)}>+</IncDec>
              </div>
              <div className="my-3">
                <Button def="def" type="cartRemove" onClick={() => handleRemove(product)}>remove</Button>
              </div>
            </div>
          </div>
          <hr className="border-1 border-gray-300"></hr>
          {/* batas map */}
      </>
    )
  }

  const total = () => {
    return (
      <p className="flex flex-row-reverse mt-8 font-semibold text-base md:text-xl text-3F70F9"> Total : Rp {new Intl.NumberFormat(['ban', 'id']).format(amount)} </p>
    )
  }

  const buttons = () => {
    return(
      <>
        {/* section harga */}
        <div className="">        
          <div className="flex flex-row-reverse my-4 gap-3">
            <Button def="def" type="cartCheckout" onClick={handleCheckout}>checkout</Button>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
    {user && <div>
      <NavbarLogin />
      <div className="font-poppins container mx-auto px-5 mb-12 lg:mb-20">
      {/* section 1 */}
      <h1 className="font-extrabold text-2xl md:text-4xl lg:mt-12" data-aos="fade-right" data-aos-duration="1500">My Carts</h1>
      {state.length === 0 && emptyCart()}
      <div data-aos="fade-right" data-aos-duration="1500">
      {state.length !== 0 && state.map(cartItems)} 
      </div>
      <div data-aos="fade-left" data-aos-duration="1500">
      {state.length !== 0 && total()}
      {state.length !== 0 && buttons()}
      </div>
      {/* section footer */}
      </div>
      <Footer />
    </div>}
    
    </>
  )
}