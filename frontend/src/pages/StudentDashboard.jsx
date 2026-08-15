import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("campusxUser")
  );

  const registrations = JSON.parse(
    localStorage.getItem("campusxRegistrations") || "[]"
  );

  // Show only registrations belonging to the logged-in student
  const myRegistrations = registrations.filter(
    (registration) => registration.email === user?.email
  );

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

        {/* Welcome */}
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

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Registered Events */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Registered Events
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {myRegistrations.length}
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Upcoming Events
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {myRegistrations.length}
            </p>
          </div>

          {/* Opportunities */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Opportunities
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              3
            </p>
          </div>

        </div>

        {/* My Registrations */}
        <div className="mt-10">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                My Registrations
              </h2>

              <p className="mt-1 text-gray-500">
                Events you have registered for.
              </p>
            </div>

            <Link
              to="/events"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Explore Events
            </Link>

          </div>

          {/* Registration Cards */}
          {myRegistrations.length === 0 ? (

            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

              <div className="text-5xl">
                📅
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No registrations yet
              </h3>

              <p className="mt-2 text-gray-500">
                Explore CampusX events and register for your first event.
              </p>

              <Link
                to="/events"
                className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Browse Events
              </Link>

            </div>

          ) : (

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {myRegistrations.map((registration) => (

                <div
                  key={registration.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >

                  {/* Event Header */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                        {registration.emoji}
                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                          {registration.category}
                        </p>

                        <h3 className="mt-1 font-bold text-gray-900">
                          {registration.eventTitle}
                        </h3>

                      </div>

                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Registered
                    </span>

                  </div>

                  {/* Details */}
                  <div className="mt-5 border-t border-gray-100 pt-4">

                    <p className="text-sm text-gray-500">
                      Registered by
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {registration.name}
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {registration.email}
                    </p>

                  </div>

                  {/* Action */}
                  <div className="mt-5 border-t border-gray-100 pt-4">

                    <Link
                      to={`/events/${registration.eventId}`}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      View Event →
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Profile */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">

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