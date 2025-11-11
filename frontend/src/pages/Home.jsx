import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  ArrowRight,
  Star,
  Truck,
  Shield,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../config/axios";
import { ToastContainer } from "../components/Toast";
import Header from "../components/layout/Header";
import { CardSkeletonLoader } from "../components/Loader";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await api.get("/products?limit=4");
        setProducts(res.data.data);
        setLoading(false);
      } catch (error) {
        addToast("error", error);
      }
    }
    fetchProducts();
  }, []);

  // console.log(products);
  // console.log("http://localhost:3000" + products[0].primaryImage)
      

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-gray-600 mb-4 tracking-wider uppercase">
              Spring Collection 2024
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
              Timeless
              <span className="block font-normal">Elegance</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Discover our carefully curated collection of premium essentials
              designed for the modern lifestyle
            </p>
            <button
              onClick={() => addToast("info", "EXPLORING")}
              className="group bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all flex items-center space-x-2 font-medium"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Free Shipping
                </h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Secure Payment
                </h3>
                <p className="text-sm text-gray-600">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Premium Quality
                </h3>
                <p className="text-sm text-gray-600">Guaranteed excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Men", "Women", "Kids", "Accessories"].map((cat) => (
              <button
                key={cat}
                className="group relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-4xl font-light">
                  {cat.charAt(0)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-6">
                  <h3 className="font-medium text-gray-900">{cat}</h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Shop Now →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Our most loved items this season</p>
            </div>
            <Link to="/products" className="text-gray-900 hover:text-gray-600 transition-colors text-sm font-medium hidden md:block">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? // Render the same number of skeletons as products length (or 4 fallback)
                Array.from({ length: products?.length || 4 }).map((_, i) => (
                  <CardSkeletonLoader key={i} />
                ))
              : products.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                     {/* {console.log()} */}
                      <img
                        crossOrigin="anonymous"
                        src={"http://localhost:3000" + product.primaryImage}
                        alt={product.title}
                        className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-light"
                      >
                        {/* {product.title.charAt(0)} */}
                      </img>
                    
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                        <Heart className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {product.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-900">
                          {product.price}$
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                          <span className="text-sm text-gray-600">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive updates on new arrivals, exclusive offers,
              and more
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-300 transition-all"
              />
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
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
                  <a href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Minimal Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
