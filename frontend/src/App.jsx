import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>

      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
