import React, {useState, useEffect} from "react";
import Button from "../components/Button";
import StarIcon from "../icons/StarIcon";
import Footer from "../layouts/Footer";
import NavbarLogin from "../layouts/NavbarLogin";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";


export default function DetailProduct(){
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("credential");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      history.push('/login')
    }
  }, []);

  const [product, setProduct] = useState ([])

  const dispatch = useDispatch()
  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    fetch("https://pickled-capricious-beak.glitch.me/products")
    .then(response => response.json())
    .then(data => setProduct(data.find(product => product.id === Number(id))))
    .catch(err => console.log(err))
  },[product])

  let { id } = useParams();

    return(
      <>
      {user && <div>
        {/* section navbar */}
         <NavbarLogin />

        <div className="font-poppins container mx-auto px-5 mb-12 lg:mb-20">
          {/* section 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="lg:col-span-1" data-aos="fade-right" data-aos-duration="1500">
              <img className="lg:w-10/12 py-6" src={product.image_url} alt="gambar"></img>
            </div>
            <div className="lg:col-span-1" data-aos="fade-left" data-aos-duration="1500">
              <h3 className="font-extrabold text-xl lg:text-2xl lg:mt-28">{product.name}</h3>
              <div className="my-2 capitalize">stock : {product.stock}</div>
              <div className="my-2"><StarIcon/>{product.rating}</div>
              <p className="mb-6 font-bold text-lg lg:xl">Rp {new Intl.NumberFormat(['ban', 'id']).format(product.price)}</p>
              <div className="inline-block capitalize mb-12">
                <Button def="def" type="detailAdd" onClick={() => addProduct(product)}>add to cart</Button>
              </div>
              <Link to = "/cart" className="inline-block capitalize mb-12 pl-3">
                <Button def="def" type="detailGo">go to cart</Button>
              </Link>
            </div>
          </div>

          {/* section 2 */}
          <div data-aos="fade-up" data-aos-duration="1500">
            <h3 className="text-base lg:text-xl font-semibold">{product.name}</h3><br></br>
            <p className="whitespace-pre-line align-bottom">{product.desc}</p>
          </div>
        </div>

        {/* section footer */}
        <Footer />
      </div> 
    }
      
      </>
    )
}