import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const CartContext = createContext()

export default function CartContextProvider(props) {


    const [cartCounter, setCartCounter] = useState(0)
    const [cartId, setCartId] = useState(null)
    console.log(cartId);




    // ana 3amlt return lel axios 3shan yeraga3 ely rag3 men elresponse 2aw elerror fa keda elfunction bet3ml return lel return 

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: localStorage.getItem("userToken")
            },
        }).then((response) => response

        )
            .catch((error) => error)
    }
    function addCartProducts(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
            headers: {
                token: localStorage.getItem("userToken")
            },
        }).then((response) => response)
            .catch((error) => error)
    }
    function updateCartCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count,
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            },
        }).then((response) => response)
            .catch((error) => error)
    }
    function deleteCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: {
                token: localStorage.getItem("userToken")
            },
        }).then((response) => response)
            .catch((error) => error)

    }
    function deleteCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: localStorage.getItem("userToken")
            },
        }).then((response) => response)
            .catch((error) => error)
    }

    async function showCartCounter() {
        let response = await getLoggedUserCart();
        setCartCounter(response.data.numOfCartItems);
        console.log(response.data);

    }



    function cashCheckOut() {


    }


    function onlinecheckOut() {


    }






    useEffect(() => {
        showCartCounter()
    }, []);


    return (

        <CartContext.Provider value={{ cartId, setCartId, cartCounter, setCartCounter,showCartCounter ,  getLoggedUserCart, addCartProducts, updateCartCount, deleteCartItem, deleteCart }} >
            {props.children}
        </CartContext.Provider>
    )
}