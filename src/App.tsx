import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import ProductCard from "./components/ProductCard/ProductCard";
import LikePage from "./pages/Like";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const likedProducts = useAppSelector((state) => state.products.likedProducts);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-md py-4 mb-6 transition-shadow duration-300 hover:shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold hover:text-blue-700 transition duration-300"
                : "text-gray-600 font-medium hover:text-gray-800 transition duration-300"
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/like"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold hover:text-blue-700 transition duration-300"
                : "text-gray-600 font-medium hover:text-gray-800 transition duration-300"
            }
          >
            Liked Products
            <span className="font-semibold ml-2 text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1 animate-pulse">
              {likedProducts.length}
            </span>
          </NavLink>
        </div>
      </nav>

      <main className="container mx-auto px-4 flex-1">
        <Routes>
          <Route path="/" element={<ProductCard />} />
          <Route path="/like" element={<LikePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md py-4 transition-shadow duration-300 hover:shadow-lg">
        <div className="container mx-auto px-4 text-center text-gray-600 hover:text-gray-800 transition duration-300">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
