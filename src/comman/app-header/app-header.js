import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import logo from "../../assets/redHeartLogoo.png";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error loading cart count:", error);
        setCartCount(0);
      }
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates
    window.addEventListener("cartCountUpdated", updateCartCount);
    window.addEventListener("storage", (e) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    });

    return () => {
      window.removeEventListener("cartCountUpdated", updateCartCount);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      // Close sidebar if open on mobile
      if (open) {
        setOpen(false);
        setActiveMenu(null);
      }
    }
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
    // You can add your search functionality here
  };

  const menuData = [
    {
      title: "Collection",
      items: [
        "Best Sellers",
        "Birthday Flowers",
        "Love & Affection",
        "Anniversary Flowers",
        "Bridal Bouquet",
        "Flower Bouquet",
        "Flowers in Vases",
        "All Flowers",
      ],
    },
    {
      title: "Shop by Flower Type",
      items: [
        "Rose Bouquet",
        "Lilies Bouquet",
        "Orchids Bouquet",
        "Mixed Flower Bouquet",
        "Carnation Bouquet",
        "Gerbera Bouquet",
      ],
    },
    {
      title: "By Occasions",
      items: [
        "Congratulations",
        "Get Well Soon",
        "I Am Sorry",
        "Cheer Up",
        "Thank You",
        "New Born",
        "Appreciation",
        "Funeral",
      ],
    },
    {
      title: "Floral Assortments",
      items: [
        "Flowers & Chocolates",
        "Flowers & Teddy",
        "All Flowers Combos",
      ],
    },
    {
      title: "Blossoms By Hues",
      items: [
        "Red Flowers",
        "Pink Flowers",
        "Yellow Flowers",
        "White Flowers",
        "Mixed Flowers",
        "Red Roses",
        "Pink Roses",
        "Yellow Roses",
        "White Roses",
        "Red & White Roses",
        "Pink & White Roses",
        "Red & Yellow Roses",
      ],
    },
  ];

  const closeSidebar = () => {
    setOpen(false);
    setActiveMenu(null);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-primary-white border-b border-grey-100 transition-all duration-500 ${
          isScrolled ? "shadow-elegant" : ""
        }`}
      >
        <nav className="w-full">
          {/* Main Navbar Row */}
          <div className={`flex items-center justify-between transition-all duration-300 ${isSearchOpen ? "h-16 md:h-20" : "h-20 md:h-24"}`}>
            {/* Logo Section - Left */}
            <div className="flex items-center flex-shrink-0 pl-4 sm:pl-6 lg:pl-8">
              <a href="/" className={`flex items-center space-x-2 sm:space-x-3 focus:outline-none group transition-all duration-300 ${isSearchOpen ? "opacity-60 scale-90" : "opacity-100 scale-100"}`}>
                <div className="relative">
                  <img
                    src={logo}
                    alt="RedHeart Logo"
                    className={`w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-sm ${isSearchOpen ? "h-8 sm:h-10 md:h-12" : "h-12 sm:h-14 md:h-16 lg:h-20"}`}
                  />
                  <div className="absolute inset-0 bg-accent-rose-100/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className={`flex flex-col transition-all duration-300 ${isSearchOpen ? "hidden sm:flex" : "flex"}`}>
                  <span className={`font-elegant text-accent-rose-600 leading-none tracking-wide transition-all duration-300 ${isSearchOpen ? "text-lg sm:text-xl md:text-2xl" : "text-2xl sm:text-3xl md:text-4xl"}`}>
                    Red Heart
                  </span>
                  <span className={`font-body text-grey-600 tracking-[0.15em] uppercase mt-0.5 transition-all duration-300 ${isSearchOpen ? "text-[8px] sm:text-[9px] hidden md:block" : "text-[10px] sm:text-xs"}`}>
                    Premium Florals
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Menu - Center */}
            <ul className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-3 flex-1 px-8">
              {menuData.map((menu, index) => (
                <li
                  key={index}
                  className="group relative"
                >
                  <button className="px-3 xl:px-5 py-3 text-sm xl:text-[15px] font-body font-medium text-black-charcoal hover:text-accent-rose-600 transition-all duration-300 relative tracking-wide">
                    <span className="relative z-10">{menu.title}</span>
                    <span className="absolute bottom-2 left-3 xl:left-5 right-3 xl:right-5 h-[2px] bg-gradient-to-r from-accent-rose-400 to-accent-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>

                  {/* Premium Dropdown */}
                  <div className="absolute hidden group-hover:block pt-3 left-1/2 -translate-x-1/2 animate-fade-in">
                    <div className="bg-primary-white shadow-premium rounded-xl p-6 w-72 border border-grey-100/50 backdrop-blur-sm">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-white border-l border-t border-grey-100 rotate-45"></div>
                      <ul className="space-y-1">
                        {menu.items.map((item, i) => (
                          <li key={i}>
                            <a
                              href="#"
                              className="block px-4 py-3 text-sm font-body text-grey-700 hover:text-accent-rose-600 hover:bg-gradient-to-r hover:from-accent-rose-50/50 hover:to-accent-pink-50/50 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-accent-rose-300"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Right Side Icons - Desktop */}
            <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2 flex-shrink-0 pr-4 sm:pr-6 lg:pr-8">
              {/* Search */}
              <button
                onClick={handleSearchClick}
                className={`p-2.5 rounded-full transition-all duration-300 group relative ${
                  isSearchOpen
                    ? "text-accent-rose-600 bg-accent-rose-50"
                    : "text-black-charcoal hover:text-accent-rose-600 hover:bg-grey-50"
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute inset-0 rounded-full bg-accent-rose-100/30 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>

              {/* User Account */}
              <button
                onClick={() => {
                  const authToken = localStorage.getItem("authToken");
                  if (authToken) {
                    navigate("/my-account");
                  } else {
                    navigate("/login");
                  }
                }}
                className="p-2.5 rounded-full text-black-charcoal hover:text-accent-rose-600 hover:bg-grey-50 transition-all duration-300 group relative"
                aria-label="Account"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute inset-0 rounded-full bg-accent-rose-100/30 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>

              {/* Shopping Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2.5 rounded-full text-black-charcoal hover:text-accent-rose-600 hover:bg-grey-50 transition-all duration-300 group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute inset-0 rounded-full bg-accent-rose-100/30 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-accent-rose-500 to-accent-pink-600 text-primary-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-soft border-2 border-primary-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center space-x-1.5 pr-4 sm:pr-6">
              {/* Mobile Search Button */}
              <button
                onClick={handleSearchClick}
                className={`p-2 text-black-charcoal focus:outline-none transition-all duration-300 hover:text-accent-rose-600 hover:bg-grey-50 rounded-full ${isSearchOpen ? "text-accent-rose-600 bg-accent-rose-50" : ""}`}
                aria-label="Search"
              >
                <Search className="w-6 h-6" strokeWidth={2} />
              </button>
              {/* Mobile Menu Button */}
              <button
                className="p-2 text-black-charcoal focus:outline-none transition-all duration-300 hover:text-accent-rose-600 hover:bg-grey-50 rounded-full"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
              >
                {open ? (
                  <X className="w-6 h-6" strokeWidth={2} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar - Expands in header */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isSearchOpen ? "max-h-32 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center gap-3 md:gap-4 w-full max-w-2xl">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400" strokeWidth={1.5} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for flowers, bouquets, gifts..."
                    className="w-full pl-12 pr-12 py-3.5 md:py-4 text-sm md:text-base font-body text-black-charcoal bg-grey-50 border-2 border-grey-200 rounded-full focus:outline-none focus:border-accent-rose-400 focus:bg-primary-white transition-all duration-300 placeholder:text-grey-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-grey-200 transition-colors duration-200"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-grey-500" strokeWidth={2} />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSearchClose}
                  className="flex-shrink-0 p-2.5 rounded-full text-grey-600 hover:text-accent-rose-600 hover:bg-grey-50 transition-all duration-300"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </form>
          </div>
        </nav>
      </header>

      {/* Mobile/Tablet Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black-soft/60 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeSidebar}
        ></div>

        {/* Sidebar */}
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-primary-white shadow-premium transform transition-transform duration-400 overflow-y-auto ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-primary-white to-grey-50/30 border-b border-grey-200 px-6 py-5 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="RedHeart Logo"
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-elegant text-2xl text-accent-rose-600 leading-none">
                  Red Heart
                </span>
                <span className="font-body text-[10px] text-grey-600 tracking-wider uppercase">
                  Menu
                </span>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-full text-grey-700 hover:text-accent-rose-600 hover:bg-grey-100 transition-all duration-300"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="px-6 py-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 pb-6 border-b border-grey-200 mb-6">
              <button
                onClick={() => {
                  closeSidebar();
                  setIsSearchOpen(true);
                }}
                className="flex flex-col items-center justify-center space-y-2 px-3 py-4 bg-gradient-to-br from-grey-50 to-grey-100/50 hover:from-accent-rose-50 hover:to-accent-pink-50 rounded-xl transition-all duration-300 text-grey-700 hover:text-accent-rose-600 group"
                aria-label="Search"
              >
                <div className="p-2 rounded-full bg-primary-white group-hover:bg-accent-rose-100 transition-colors duration-300">
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-body font-medium">Search</span>
              </button>
              <button
                onClick={() => {
                  navigate("/cart");
                  closeSidebar();
                }}
                className="flex flex-col items-center justify-center space-y-2 px-3 py-4 bg-gradient-to-br from-grey-50 to-grey-100/50 hover:from-accent-rose-50 hover:to-accent-pink-50 rounded-xl transition-all duration-300 text-grey-700 hover:text-accent-rose-600 group relative"
                aria-label="Cart"
              >
                <div className="p-2 rounded-full bg-primary-white group-hover:bg-accent-rose-100 transition-colors duration-300 relative">
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-br from-accent-rose-500 to-accent-pink-600 text-primary-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-body font-medium">Cart</span>
              </button>
              <button
                onClick={() => {
                  const authToken = localStorage.getItem("authToken");
                  if (authToken) {
                    navigate("/my-account");
                    setOpen(false);
                  } else {
                    navigate("/login");
                    setOpen(false);
                  }
                }}
                className="flex flex-col items-center justify-center space-y-2 px-3 py-4 bg-gradient-to-br from-grey-50 to-grey-100/50 hover:from-accent-rose-50 hover:to-accent-pink-50 rounded-xl transition-all duration-300 text-grey-700 hover:text-accent-rose-600 group"
                aria-label="Account"
              >
                <div className="p-2 rounded-full bg-primary-white group-hover:bg-accent-rose-100 transition-colors duration-300">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-body font-medium">Account</span>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="space-y-2">
              {menuData.map((menu, index) => (
                <div key={index} className="border-b border-grey-100 last:border-0">
                  <button
                    className="w-full text-left px-4 py-4 flex justify-between items-center font-display font-semibold text-base text-black-charcoal hover:text-accent-rose-600 transition-all duration-300 rounded-lg hover:bg-grey-50 group"
                    onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                  >
                    <span className="relative">
                      {menu.title}
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-rose-400 to-accent-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 text-grey-500 group-hover:text-accent-rose-600 ${
                        activeMenu === index ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>

                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeMenu === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="pl-4 pb-4 space-y-1 mt-2">
                      {menu.items.map((item, i) => (
                        <li key={i}>
                          <a
                            href="#"
                            className="block px-4 py-3 text-sm font-body text-grey-700 hover:text-accent-rose-600 hover:bg-gradient-to-r hover:from-accent-rose-50/50 hover:to-accent-pink-50/50 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-accent-rose-300"
                            onClick={closeSidebar}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}
