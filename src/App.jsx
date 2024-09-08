import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import UserContextProvider from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import WishList from './components/WishList/WishList'
import WishListContextProvider from './components/WishListContext/WishListContext'
import Checkout from './components/Checkout/Checkout'
import AllOrders from './components/AllOrders/AllOrders'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetCode from './components/ResetCode/ResetCode'
import NewPassword from './components/NewPassword/NewPassword'



let query = new QueryClient()

let routes = createBrowserRouter([
  {
    path: "", element: <LayOut />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "cashpay", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "forget", element: <ForgetPassword /> },
      { path: "resetcode", element: <ResetCode /> },
      { path: "newpassword", element: <NewPassword />},
      { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ]
  }
])

function App() {

  return (

    <QueryClientProvider client={query}>
      <UserContextProvider>
          <WishListContextProvider>
            <CartContextProvider>
              <RouterProvider router={routes}></RouterProvider>
              <Toaster />
              <ReactQueryDevtools />
            </CartContextProvider>
          </WishListContextProvider>
      </UserContextProvider>
    </QueryClientProvider>


  )
}

export default App
