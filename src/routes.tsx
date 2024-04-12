import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListCategories from "./pages/ListCategories";
import AddCategorie from "./pages/AddCategorie";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListCategories />} />
        <Route path="/adiciona-categoria" element={<AddCategorie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
