import { useState } from "react";
import { Mail, Lock, Eye, User, ArrowRight, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer } from "../../components/Toast";

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);
  const { setUser } = useAuth();


   const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      addToast("info", "You must agree to the terms before registering.");
      return;
    }
    try {
      const { fullname, email, password } = formData;
      const res = await api.post("/auth/register", {
        fullname,
        email,
        password,
      });

      // Store the token in localstorage
      const token = res.data.data.token;
      localStorage.setItem("token", token);

      const user = res.data.data.user;
      setUser(user);

      navigate("/");
    }  catch (error) {
      if (error.response.data.message) {
        addToast("error", error.response.data.message);
      } else if (error.response.data.errors) {
         const messages = Object.values(error.response.data.errors)
          .flat()
          .join(" | "); 
        addToast("error", messages);
      } else {
        addToast("error", "Something went wrong!");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-2xl font-light tracking-wider text-gray-900 mb-2">
              MINIMAL
            </div>
            <p className="text-sm text-gray-600">Join our community</p>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Sign up to start your shopping journey
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullname"
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:border-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Must be at least 8 characters
              </p>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 text-gray-900"
              />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <button className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all font-medium flex items-center justify-center space-x-2 group"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Google
                </span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Facebook
                </span>
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-900 hover:text-gray-600 transition-colors font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Brand */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-100 to-gray-50 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Join Minimal
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            Create your account and discover a world of premium products curated
            just for you
          </p>

          {/* Benefits List */}
          <div className="space-y-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Exclusive Access
                </h3>
                <p className="text-sm text-gray-600">
                  Get early access to new collections and sales
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Personalized Experience
                </h3>
                <p className="text-sm text-gray-600">
                  Recommendations tailored to your style
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Member Rewards
                </h3>
                <p className="text-sm text-gray-600">
                  Earn points with every purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
            <ToastContainer toasts={toasts} removeToast={removeToast} />

    </div>
  );
}
