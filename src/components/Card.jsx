import { useEffect, useState, useMemo } from "react";
import StarIcon from "../icons/StarIcon";
import Pagination from "./Pagination";
import Button from "./Button";
import { Link } from 'react-router-dom';
import { SearchHome } from "./Search";
import debounce from "lodash.debounce";
import iniloading from "../images/loading.gif"

export default function Card(){
  const [product, setProduct] = useState ([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const [filter, setFilter] = useState(product)
  const [search, setSearch] = useState('')
  const [sortType, setSortType] = useState('')

  // get data from API
  let componentMounted = true
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const response = await fetch("https://pickled-capricious-beak.glitch.me/products")
      if(componentMounted) {
        setProduct(await response.clone().json())
        setFilter(await response.json())
        setLoading(false)
      }
      return () => {
        componentMounted = false
      }
    }
    getProducts()
  },[])

  // sort by func
  useEffect(() => {
    const sortArray = type => {
      const price = {
        price: 'price',
      };
      const rating = {
        rating: 'rating'
      }
      const sortPrice = price[type];
      const sortRating = rating[type];
      if (sortPrice){
        const sorted = [...filter].sort((a, b) =>  a[sortPrice] - b[sortPrice]);
        setFilter(sorted);
      } else {
        const sorted = [...filter].sort((a, b) => b[sortRating] - a[sortRating]);
        setFilter(sorted);
      }
    }
    sortArray(sortType);
  }, [sortType]); 
  
  // pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filter.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // search func
  const changeHandler = (event) => {
    setSearch(event.target.value);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 1000)
  , []);

  // filter category func
  const filterProduct = (cat) => {
    const updatedList = product.filter((x)=>x.category === String(cat))
    setFilter(updatedList)
  }


  const Loading = () => {
    return (
      <div className="h-screen my-5">
        <p className="font-poppins font-bold container mx-auto px-5 text-sm lg:text-lg text-center capitalize">please wait...</p>
        <img src={iniloading} alt="loading" className = "w-3/12 container mx-auto flex justify-center"></img>
      </div>
      )
    }
    
  const ShowProducts = () => {
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
          <SearchHome onChange = {debouncedChangeHandler}/>
        </div>
      </div>
      <div className = "flex justify-center mt-3 md:hidden ">
        <SearchHome onChange = {debouncedChangeHandler}/>
      </div>
      <div className="w-full">
      <section className="max-w-5x mx-5 lg:mx-12 my-8 transition-shadow">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
          {
            currentPosts ?.filter(product => {
              if (search === "") {
                return filter
              } else if (product.name.toLowerCase().includes(search.toLowerCase())){
                return filter
              }
            }).map((product, key) => {
              return (
                <div className="w-full white shadow-lg rounded-lg overflow-hidden flex flex-col justify-center transition duration-500 ease-in-out hover:shadow-gray-800 transform hover:-translate-y-1 hover:scale-110" key={product.id}>
                  <div>
                    <img className="object-scale-down h-auto max-h-32 w-full" src={product.image_url} alt="gambar"/>
                  </div>
                  <div className="py-4 sm:py-6 px-3">
                    <p className="text-left md:text-center text-sm sm:text-base text-gray font-semibold mb-2 sm:h-12 max-h-16 line-clamp-2 flex items-center">{product.name}</p>
                    <p className="text-left hidden sm:block text-xs sm:text-base font-normal">Stock: {product.stock}</p>
                    <p className="text-left text-xs sm:text-base font-normal "><StarIcon/>{product.rating}</p>
                    <p className="text-left text-xs sm:text-base font-normal">Rp {
                    new Intl.NumberFormat(['ban', 'id']).format(product.price)}</p>
                    <Link className="mt-2 sm:my-2 text-xs sm:text-base" to={`/detailproduct/${product.id}`}>
                      <Button type="cardBuy" def="default">Detail</Button>
                    </Link>
                  </div>
                </div> 
              )
            })
          }               
        </div>
      </section>

      <div className="container mx-auto flex justify-center px-5 lg:px-0">
        <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filter.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      </div>
      </div>
    </div>
    )
  }
  return(
    <div>
      {loading ? <Loading /> : <ShowProducts />}
    </div>
  )
}