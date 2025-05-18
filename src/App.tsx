import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductPage from "./components/ProductPage";
import MainContent from "./components/MainContent";

function App() {
  return (
    <BrowserRouter basename="/TS-Tailwind-Min-Project">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
