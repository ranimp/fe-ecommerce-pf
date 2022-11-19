import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, {useEffect} from "react";
import Homepage from './pages/Homepage';
import DetailProduct from './pages/DetailProductPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import ContactPage from './pages/ContactPage';
import Cart from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import CheckoutSuccess from './pages/CheckoutSuccessPage';
import NotFound from "./pages/NotFoundPage";
import AOS from "aos";
import "aos/dist/aos.css";


AOS.init();
// useEffect(() => {
// },[])


function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = "/detailproduct/:id" component={DetailProduct} />
          <Route exact path = "/login" component={LoginPage} />
          <Route exact path = "/signup" component={SignUp} />
          <Route exact path = "/contact" component={ContactPage} />
          <Route exact path = "/cart" component={Cart} />
          <Route exact path = "/product" component={ProductPage} />
          <Route exact path = "/success" component={CheckoutSuccess} />
          <Route exact path="/" component={Homepage} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;