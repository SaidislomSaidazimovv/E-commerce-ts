import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts, toggleLike } from "../../features/productsSlice";
import { FaHeart } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="card group bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity duration-300"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300">
              {product.title}
            </h3>
            <p className="text-gray-700 mb-4">${product.price}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleLike(product.id));
                }}
                className="text-2xl transition-transform duration-300 ease-in-out transform hover:scale-125"
                style={{ color: product.isLiked ? "red" : "gray" }}
              >
                <FaHeart />
              </button>
              <span className="text-gray-500 text-sm">Add to Cart</span>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
