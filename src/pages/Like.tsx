import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { toggleLike } from "../features/productsSlice";
import { useEffect, useState } from "react";

const LikePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const likedProducts = products.filter((product) => product.isLiked);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: number) => {
    dispatch(toggleLike(id));
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Liked Products
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {likedProducts.length > 0 ? (
            likedProducts.map((product) => (
              <div
                key={product.id}
                className="card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-700">${product.price}</p>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No liked products yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LikePage;
