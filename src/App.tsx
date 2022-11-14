import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes,Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import Home from './pages/Home'
import Store from './pages/Store'
import About from './pages/About'
import Navbar from './components/NavBar'
import { ShoppingCartProvider } from './context/ShopingCartContext'
function App() {
  const [count, setCount] = useState(0)

  return (
    <ShoppingCartProvider>
    <Navbar/>
    <Container className="mb-4" style={{height:"100vh"}}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Container>
    </ShoppingCartProvider>
  )
}

export default App