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

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  // const [toasts, setToasts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [curretPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [nextPage, setNextPage] = useState(curretPage + 1);
  // const [previousPage, setPreviousPage] = useState(curretPage - 1);

  // const addToast = (type, message) => {
  //   const id = Date.now();
  //   setToasts((prev) => [...prev, { id, type, message }]);
  // };

  // const removeToast = (id) => {
  //   setToasts((prev) => prev.filter((toast) => toast.id !== id));
  // };

  useEffect(() => {
    async function fetchProducts() {
      // setLoading(true);
      try {
        const res = await api.get("/products", {
          params: { page: curretPage, limit: 12 },
        });
        setProducts(res.data.data);
        setTotal(res.data.meta.total);
        setPages(res.data.meta.pages);
        // setCurrentPage(res.data.meta.page);
      } catch (error) {
        console.log(error);

        // addToast("error", error);
      } finally {
        // setLoading(false);
      }
    }
    fetchProducts();
  }, [curretPage]);

  const nextPage = Math.min(curretPage + 1, pages);
  const previousPage = Math.max(1, curretPage - 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4 text-sm text-gray-600">
            <div className="hidden md:flex items-center space-x-6">
              <button className="hover:text-gray-900 transition-colors">
                Stores
              </button>
              <button className="hover:text-gray-900 transition-colors">
                Help
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <button className="hover:text-gray-900 transition-colors">
                Track Order
              </button>
              <button className="hover:text-gray-900 transition-colors">
                Sign In
              </button>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-6 border-t border-gray-100">
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-gray-900" />
            </button>

            <div className="text-2xl font-light tracking-wider text-gray-900">
              MINIMAL
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
              <button className="hover:text-gray-900 transition-colors">
                New Arrivals
              </button>
              <button className="hover:text-gray-900 transition-colors">
                Men
              </button>
              <button className="hover:text-gray-900 transition-colors">
                Women
              </button>
              <button className="hover:text-gray-900 transition-colors">
                Kids
              </button>
              <button className="hover:text-gray-900 transition-colors">
                Sale
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <button className="hover:text-gray-900 transition-colors hidden md:block">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <button className="hover:text-gray-900 transition-colors">
                <Heart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="hover:text-gray-900 transition-colors relative">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  2
                </span>
              </button>
              <button className="hover:text-gray-900 transition-colors hidden md:block">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
                      src={product.primaryImage}
                      alt={product.title}
                      className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-light"
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
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-xl font-light tracking-wider mb-4">
                MINIMAL
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium quality products for the modern lifestyle
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Best Sellers
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Sale
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    FAQs
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Shipping
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Press
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Minimal Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
