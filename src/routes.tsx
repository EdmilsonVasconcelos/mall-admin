import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListShops from "./pages/ListShops";
import UpsertShop from "./pages/UpsertShop";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListShops />} />
        <Route path="/adiciona-loja" element={<UpsertShop />} />
        <Route path="/edita-loja/:id" element={<UpsertShop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
