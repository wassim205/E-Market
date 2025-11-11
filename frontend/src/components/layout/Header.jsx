import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react";
import { InlineLoader } from "../Loader";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function Header() {
  const { user, loading, logout } = useAuth();

//   console.log(user);
  
  if (loading) {
    return <InlineLoader />;
  }

  return (
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
            <button className="cursor-pointer hover:text-gray-900 transition-colors">
              Track Order
            </button>

            {user ? (
              <>
                <span className="text-gray-900 font-medium">
                  Hello, {user.fullname}
                </span>
                <button
                  onClick={logout}
                  className="cursor-pointer hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-900 transition-colors">
                Sign In
              </Link>
            )}
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

        {/* Search Bar Mobile */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-gray-300 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
