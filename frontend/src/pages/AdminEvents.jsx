import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/events"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600"
          >
            CampusX
          </Link>

          <div className="flex gap-3">

            <Link
              to="/admin/dashboard"
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Registrations
            </Link>

            <Link
              to="/events"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              View Events
            </Link>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Heading */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Event Management
          </h1>

          <p className="mt-2 text-gray-600">
            View all events available on CampusX.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Events
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {loading ? "—" : events.length}
            </p>

          </div>

        </div>

        {/* Content */}
        {loading && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">

            <div className="text-4xl">
              ⏳
            </div>

            <p className="mt-4 font-semibold text-gray-900">
              Loading events...
            </p>

          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-6 text-center">

            <p className="font-semibold text-red-600">
              {error}
            </p>

          </div>
        )}

        {!loading &&
          !error &&
          events.length === 0 && (
            <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">

              <div className="text-5xl">
                📅
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                No events found
              </h2>

            </div>
          )}

        {/* Event Cards */}
        {!loading &&
          !error &&
          events.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {events.map((event) => (

                <div
                  key={event.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >

                  {/* Category */}
                  <div className="flex items-center justify-between">

                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      {event.category}
                    </span>

                    <span className="text-sm text-gray-400">
                      #{event.id}
                    </span>

                  </div>

                  {/* Title */}
                  <h2 className="mt-5 text-xl font-bold text-gray-900">
                    {event.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {event.description}
                  </p>

                  {/* Details */}
                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-gray-500">
                        Date
                      </span>

                      <span className="text-right text-sm font-medium text-gray-900">
                        {event.date}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-gray-500">
                        Location
                      </span>

                      <span className="text-right text-sm font-medium text-gray-900">
                        {event.location}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-gray-500">
                        Registrations
                      </span>

                      <span className="text-sm font-semibold text-gray-900">
                        {event.registrations}
                      </span>
                    </div>

                  </div>

                  {/* Action */}
                  <Link
                    to={`/events/${event.id}`}
                    className="mt-6 block rounded-xl border border-indigo-200 px-4 py-3 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                  >
                    View Event
                  </Link>

                </div>

              ))}

            </div>
          )}

      </main>

    </div>
  );
}

export default AdminEvents;