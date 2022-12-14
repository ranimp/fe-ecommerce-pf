import { useState } from "react";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";
import { Link } from 'react-router-dom';
import { SearchHome } from "./Search";
import { useDispatch } from 'react-redux';
import { addCart } from './../redux/action/index';
import formatRupiah from './FormatRupiah';

export default function Card({
  filterProduct, 
  debounced, 
  currentPosts, 
  product, 
  setSortType, 
  search}){

  const [filter, setFilter] = useState(product)
  const dispatch = useDispatch()
  const addProduct = (product) => {
    dispatch(addCart(product))
    alert('Berhasil menambahkan ' + product.title)
  }

  return (
    <div className="font-poppins container mx-auto px-5 text-sm lg:text-base">
      <div className="flex md:justify-center gap-4 overflow-x-auto">
        <button className='font-md border-b-2 hover:border-3F70F9' onClick = {() => setFilter(product)}>All</button>
        <button className='font-md border-b-2 hover:border-3F70F9' onClick = {() => filterProduct("PC")}>PC</button>
        <button className='font-md border-b-2 hover:border-3F70F9' onClick = {() => filterProduct("laptop")}>Laptop</button>
        <button className='font-md border-b-2 hover:border-3F70F9' onClick = {() => filterProduct("handphone")}>Handphone</button>  
        <button className='font-md border-b-2 hover:border-3F70F9' onClick = {() => filterProduct("tablet")}>Tablet</button>  
        <button className='font-md border-b-2 hover:border-3F70F9' onClick = {() => filterProduct("accessories")}>Accessories</button>
        <select
          id="show"
          className="form-select cursor-pointer"
          aria-label="Default select example"
          onChange = {(e) => setSortType(e.target.value)}
        >
        <option value="name" className="text-sm">Sort by</option>
        <option value="price" className="text-sm">Price</option>
        <option value="rating" className="text-sm">Rating</option>
        </select>
        <div className = "hidden md:block">
          <SearchHome onChange = {debounced}/>
        </div>
      </div>
      <div className = "flex justify-center mt-3 md:hidden ">
        <SearchHome onChange = {debounced}/>
      </div>
      <div className="w-full">
      <section className="max-w-5x mx-5 lg:mx-12 my-8 transition-shadow">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
          {
            currentPosts?.map((product, key) => {
              return (
                <div className="w-full white shadow-lg rounded-lg overflow-hidden flex flex-col justify-center transition duration-500 ease-in-out hover:shadow-gray-800 transform hover:-translate-y-1 hover:scale-110" key={product.id}>
                  <div>
                    <img className="object-scale-down h-auto max-h-32 w-full" src={product.thumbnail} alt="gambar"/>
                  </div>
                  <div className="py-4 sm:py-6 px-3">
                    <p className="text-left md:text-center text-sm sm:text-base text-gray font-semibold mb-2 sm:h-12 max-h-16 line-clamp-2 flex items-center">{product.title}</p>
                    <p className="text-left hidden sm:block text-xs sm:text-base font-normal">Stock: {product.stock}</p>
                    <p className="text-left text-xs sm:text-base font-normal "><StarIcon/>{product.rating}</p>
                    <p className="text-left text-xs sm:text-base font-normal"> 
                    Rp{formatRupiah(product.price)}
                    </p>
                    <Link className="mt-2 sm:my-2 text-xs sm:text-base" to={`/detailproduct/${product.id}`}>
                      <Button type="cardBuy" def="default">Detail</Button>
                    </Link>
                    <div className="mt-2">
                      <Button def="def" type="detailAdd" onClick={() => addProduct(product)}>add to cart</Button>
                    </div>
                  </div>
                </div> 
              )
            })
          }               
        </div>
      </section>
      </div>
    </div>
  )
}