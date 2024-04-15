import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListShops from "./pages/ListShops";
import UpsertCategorie from "./pages/UpsertCategorie";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListShops />} />
        <Route path="/adiciona-loja" element={<UpsertCategorie />} />
        <Route path="/edita-loja/:id" element={<UpsertCategorie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
