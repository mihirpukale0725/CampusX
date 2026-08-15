import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("campusxLoggedIn") === "true"
  );

  const handleLogout = () => {
    localStorage.removeItem("campusxLoggedIn");
    localStorage.removeItem("campusxUser");

    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-indigo-600"
        >
          CampusX
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/events"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Events
          </Link>

          <Link
            to="/events?category=Hackathon"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Hackathons
          </Link>

          <Link
            to="/events?category=Coding%20Contest"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Coding Contests
          </Link>

          <Link
            to="/events"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Opportunities
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {isLoggedIn ? (
            <>
              {/* Dashboard */}
              <Link
                to="/student/dashboard"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;