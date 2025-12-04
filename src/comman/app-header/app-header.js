import { useState } from "react";
import logo from "../../assets/redHeartLogoo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium relative">
          {menuData.map((menu, index) => (
            <li
              key={index}
              className="group relative cursor-pointer"
            >
              <span className="hover:text-blue-600">{menu.title}</span>

              {/* Dropdown */}
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-4 w-56 top-full left-0">
                <ul className="space-y-2">
                  {menu.items.map((item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="block hover:text-blue-600 text-gray-700"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 animate-fadeIn">
          {menuData.map((menu, index) => (
            <div key={index} className="border-b py-2">
              <button
                className="w-full text-left font-semibold text-lg flex justify-between items-center"
                onClick={() => setActiveMenu(activeMenu === index ? null : index)}
              >
                {menu.title}
                <span>{activeMenu === index ? "-" : "+"}</span>
              </button>

              {/* Submenu */}
              {activeMenu === index && (
                <ul className="mt-2 pl-4 space-y-2">
                  {menu.items.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="block text-gray-700 hover:text-blue-600">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
