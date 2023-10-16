import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Product from './pages/product';
import UploadImage from './pages/uploadImage';

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/product/:productHandle" Component={Product} />
      {/* <Route path="/product/headphones" element={<Product productHandle={"wireless-kids-bluetooth-headset"} />} />
      <Route path="/product/smartwatches" element={<Product productHandle={"smart-watches-bluetooth-calling"} />} />
      <Route path="/product/laptops" element={<Product productHandle={"asus-chromebook-celeron-dual-core-n4020"} />} />
      <Route path="/product/mobiles" element={<Product productHandle={"apple-iphone-14-pro-max"} />} /> */}
      <Route path="/upload" element={<UploadImage />} />
    </Routes>
  );
}

export default App;
