import {
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { FullPageLoader } from "../../components/Loader";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(product?.primaryImage);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <FullPageLoader />;
  }

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
            <button className="hover:text-gray-900 transition-colors">
              Electronics
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              Premium Product Name
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left - Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 aspect-square">
              <img
                crossOrigin="anonymous"
                src={product.primaryImage}
                // src={"http://localhost:3000" + product.primaryImage}
                alt={product}
                className="w-full h-full flex items-center justify-center text-gray-300 text-9xl font-light"
              ></img>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.secondaryImages?.map((img) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square bg-white border-2 rounded-lg overflow-hidden hover:border-gray-900 transition-all ${
                    selectedImage === img
                      ? "border-gray-900"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    crossOrigin="anonymous"
                    src={img}
                    // src={"http://localhost:3000" + img}
                    alt={product.title}
                    className="w-full h-full flex items-center justify-center text-gray-300 text-3xl font-light"
                  ></img>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            {/* Title & Rating */}
            <div className="mb-6">
              <h1 className="text-3xl font-light text-gray-900 mb-3">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-gray-900 text-gray-900"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8 (124 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-light text-gray-900">
                  ${product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {product.ex_price && `$${product.ex_price}`}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">
                  {product.ex_price
                    ? `${Math.round(
                        ((product.ex_price - product.price) /
                          product.ex_price) *
                          100
                      )}% OFF`
                    : "In Stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
                {/* Experience premium quality with this carefully crafted product.
                Made with the finest materials and attention to detail, it's
                designed to elevate your everyday life. */}
              </p>
            </div>

            {/* Color Selection
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex items-center space-x-3">
                {[
                  "bg-gray-900",
                  "bg-blue-600",
                  "bg-red-600",
                  "bg-green-600",
                ].map((color, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 ${color} rounded-full border-2 ${
                      i === 0
                        ? "border-gray-900 ring-2 ring-offset-2 ring-gray-200"
                        : "border-transparent"
                    } hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div> */}

            {/* Size Selection
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {["XS", "S", "M", "L"].map((size, i) => (
                  <button
                    key={size}
                    className={`py-3 border-2 rounded-lg text-sm font-medium transition-all ${
                      i === 2
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button className="p-3 hover:bg-gray-50 transition-colors">
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="px-6 text-gray-900 font-medium">1</span>
                  <button className="p-3 hover:bg-gray-50 transition-colors">
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock === 0
                    ? "Out of Stock"
                    : product.stock < 20
                    ? `Only ${product.stock} item${
                        product.stock > 1 ? "s" : ""
                      } left in stock`
                    : `${product.stock} items available`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button className="cursor-pointer w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-all font-medium">
                Add to Cart
              </button>
              <button className="cursor-pointer w-full bg-white border-2 border-gray-900 text-gray-900 py-4 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg">
                <Truck className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg">
                <RotateCcw className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Easy Returns
                  </h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-gray-100 rounded-lg">
                <Shield className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Secure Payment
                  </h4>
                  <p className="text-sm text-gray-600">
                    100% secure transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <button className="pb-4 border-b-2 border-gray-900 text-gray-900 font-medium">
                Description
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors">
                Specifications
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors">
                Reviews (124)
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            <h3 className="text-xl font-light text-gray-900 mb-4">
              Product Description
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{product.description}</p>
              {/* <p>
                Featuring a timeless design that effortlessly complements any
                style, this product is built to last. The combination of form
                and function makes it an essential addition to your collection.
              </p> */}
              {/* <h4 className="text-lg font-medium text-gray-900 mt-6 mb-3">
                Key Features:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span>Premium quality materials for lasting durability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span>Timeless design that never goes out of style</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span>Versatile and suitable for various occasions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span>Easy to maintain and care for</span>
                </li>
              </ul> */}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-light">
                    {index + 1}
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                    Related Product Name
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">Category</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      $79.00
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                      <span className="text-sm text-gray-600">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
