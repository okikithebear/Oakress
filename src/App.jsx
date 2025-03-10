import {Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import CollectionsPage from './Pages/CollectionsPage'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import OurPolicy from './Components/OurPolicy'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:ps-[9vw]'>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/collections' element={<CollectionsPage/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/product/:productId' element={<Product/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/place-order' element={<PlaceOrder/>} />
          <Route path='/orders' element={<Orders/>} />

          
      </Routes>
      
      <OurPolicy/>
      <Footer/>
    </div>
  )
}

export default App
