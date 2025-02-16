import { useState } from "react";

import { Link } from "react-router-dom";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <nav className="sticky top-0 flex w-full items-center justify-between bg-white p-4 shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        <span className="text-blue-600">Cine</span>
        <span className="text-black">Searcher</span>
      </div>
      {/* Navigation Tabs */}
      <div className="flex flex-grow justify-center space-x-6">
        <Link to="/">
          <button
            className={`text-lg ${
              activeTab === "Home" ? "font-bold text-blue-600" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </button>
        </Link>
        <Link to="/favourite">
          <button
            className={`text-lg ${
              activeTab === "Favourites"
                ? "font-bold text-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab("Favourites")}
          >
            Favourites
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Header;
