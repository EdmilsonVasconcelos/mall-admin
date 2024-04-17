import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListShops from "./pages/ListShops";
import UpsertShop from "./pages/UpsertShop";
import ListCategories from "./pages/ListCategories";
import UpsertCategory from "./pages/UpsertCategory";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListShops />} />
        <Route path="/adiciona-loja" element={<UpsertShop />} />
        <Route path="/edita-loja/:id" element={<UpsertShop />} />
        <Route path="/lista-categorias" element={<ListCategories />} />
        <Route path="/adiciona-categoria" element={<UpsertCategory />} />
        <Route path="/edita-categoria/:id" element={<UpsertCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
