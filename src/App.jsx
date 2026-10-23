
import { Routes, Route } from "react-router-dom";
import ProductShowcase from "./ProductShowcase.jsx";
import ProductLaunch from "./ProductLaunch.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductShowcase />} />
      <Route path="/launch" element={<ProductLaunch />} />
    </Routes>
  );
}
