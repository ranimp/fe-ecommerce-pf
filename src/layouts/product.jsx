import { useEffect, useState, useMemo } from "react";
import ShowProducts from '../components/Card'
import debounce from "lodash.debounce";
import iniloading from "../images/loading.gif"

export default function Product(){
  const [product, setProduct] = useState ([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [sortType, setSortType] = useState('')
  let listToDisplay = product

  // get data from API
  let componentMounted = true
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const response = await (
        await fetch("https://dummyjson.com/products")
        ).json()
      if(componentMounted) {
        setProduct(response.products)
        setFilter(response.products)
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


  // search func
  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

  if (search !== '') {
    listToDisplay = filter?.filter((product) => product?.title.toLowerCase()
      .includes(search.toLowerCase()));
  }
  useEffect(() => () => {
    debouncedChangeHandler.cancel();
  });

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
    
  return(
    <div>
      {loading ? <Loading /> : <ShowProducts filterProduct = {filterProduct} 
        debounced = {debouncedChangeHandler}
        currentPosts = {listToDisplay}
        product = {listToDisplay}
        setSortType = {setSortType} 
        search = {search}
      />}
    </div>
  )
}