import { Link } from "react-router-dom";

function Navbar() {
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

          <button className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:block">
            Login
          </button>

          <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Create Event
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;