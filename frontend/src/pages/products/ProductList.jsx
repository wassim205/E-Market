import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  SlidersHorizontal,
  ChevronDown,
  Grid3x3,
  List,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import { FullPageLoader } from "../../components/Loader";
import Footer from "../../components/layout/Footer";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [curretPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await api.get("/products", {
          params: { page: curretPage, limit: 12 },
        });
        setProducts(res.data.data);
        setTotal(res.data.meta.total);
        setPages(res.data.meta.pages);
        toast(<Toast type="success" message="Products loaded successfully" />)
      } catch (error) {
        console.log(error);
        toast(<Toast type="error" message="Failed to load products" />)
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [curretPage]);

  const nextPage = Math.min(curretPage + 1, pages);
  const previousPage = Math.max(1, curretPage - 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button className="hover:text-gray-900 transition-colors">
              Home
            </button>
            <span>/</span>
            <button className="hover:text-gray-900 transition-colors">
              Shop
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">All Products</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">Filters</h3>
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Category
                </h4>
                <div className="space-y-3">
                  {[
                    "All Products",
                    "Electronics",
                    "Fashion",
                    "Home & Living",
                    "Beauty",
                    "Sports",
                  ].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 text-gray-900"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Price Range
                </h4>
                <div className="space-y-3">
                  {[
                    "Under $25",
                    "$25 - $50",
                    "$50 - $100",
                    "$100 - $200",
                    "Over $200",
                  ].map((price) => (
                    <label
                      key={price}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 text-gray-900"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Rating
                </h4>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 text-gray-900"
                      />
                      <div className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating
                                ? "fill-gray-900 text-gray-900"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="border border-gray-200 rounded py-2 text-sm text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-all"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-light text-gray-900 mb-1">
                  All Products
                </h1>
                <p className="text-sm text-gray-600">
                  Showing 1-12 of {total} products
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button className="lg:hidden flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-1">
                  <button className="p-2 bg-gray-900 text-white rounded">
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                    <span>Sort By</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id}>
                  <div
                    key={product._id}
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                        crossOrigin="anonymous"
                        src={product.primaryImage}
                        // src={"http://localhost:3000" + product.primaryImage}
                        alt={product.title}
                        className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-light h-full object-cover object-center"
                      ></img>
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                        <Heart className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {product.categories.map((category) => category.name)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-medium text-gray-900">
                            ${product.price}
                          </span>
                          {product.ex_price && (
                            <span className="text-sm text-gray-400 line-through">
                              ${product.ex_price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(previousPage)}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
              >
                ←
              </button>
              {[...Array(pages)].map((_, i) => (
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  key={i + 1}
                  className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(nextPage)}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
            <Footer />

      {/* <FullPageLoader /> */}
      {loading && <FullPageLoader />}
      {/* <ToastContainer toasts={toasts} removeToast={removeToast} /> */}
      
    </div>
  );
}
