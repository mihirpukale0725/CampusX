import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("campusxUser"));

  const handleLogout = () => {
    localStorage.removeItem("campusxLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600"
          >
            CampusX
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Dashboard */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Student Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || "Student"}! 👋
          </h1>

          <p className="mt-2 text-gray-600">
            Discover events, manage registrations and explore opportunities.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Registered Events
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Upcoming Events
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Opportunities
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              0
            </p>
          </div>

        </div>

        {/* Profile */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            My Profile
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {user?.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {user?.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                College / University
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {user?.college || "-"}
              </p>
            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="mt-5 flex flex-wrap gap-4">

            <Link
              to="/events"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Explore Events
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Go to Home
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;