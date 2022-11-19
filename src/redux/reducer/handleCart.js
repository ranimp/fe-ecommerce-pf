const cart = [];

const handleCart =(state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            // Check if Product is Already Exist
            const exist = state.find((x)=> x.id === product.id);
            if(exist){
                // Increase the Quantity
                let newTotal = state.total + exist.price
                return state.map((x)=>
                x.id === product.id ? {...x, qty: x.qty + 1, total: newTotal} : x
                );
            }else{
                const product = action.payload;
                return[
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    }
                ]
            }
            break;

            case "DELITEM":
                const exist1 = state.find((x)=> x.id === product.id);
                if(exist1.qty === 1){
                    return state.filter((x)=> x.id !== exist1.id);
                }else{
                    let newTotal = state.total + exist1.price
                    return state.map((x)=>
                        x.id === product.id ? {...x, qty: x.qty-1, total : newTotal} : x
                    );
                }
                break;

            case "REMOVEITEM" :
              return state = state.filter((x)=>{
                  return x.id !== action.payload.id
              })
              break;

            case "CLEARITEM" :
              return state = []
              break;
    
        default:
            return state;
            break;
    }

}

export default handleCart;