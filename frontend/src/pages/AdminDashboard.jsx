import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/registrations"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch registrations");
        }

        const data = await response.json();

        setRegistrations(data.registrations || data || []);
      } catch (err) {
        console.error("Admin registration error:", err);
        setError("Unable to load registrations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
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

          <Link
            to="/events"
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            View Events
          </Link>

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
            Registration Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            View all student registrations recorded by CampusX.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Registrations
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {loading ? "—" : registrations.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Unique Students
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {loading
                ? "—"
                : new Set(
                    registrations.map(
                      (registration) => registration.email
                    )
                  ).size}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Events Registered
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {loading
                ? "—"
                : new Set(
                    registrations.map(
                      (registration) => registration.event_id
                    )
                  ).size}
            </p>
          </div>

        </div>

        {/* Registrations */}
        <section className="mt-10">

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                All Registrations
              </h2>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-10 text-center">
                <div className="text-4xl">⏳</div>

                <p className="mt-4 font-semibold text-gray-900">
                  Loading registrations...
                </p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="p-10 text-center">
                <div className="text-4xl">⚠️</div>

                <p className="mt-4 font-semibold text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Empty */}
            {!loading &&
              !error &&
              registrations.length === 0 && (
                <div className="p-10 text-center">

                  <div className="text-5xl">
                    📋
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    No registrations found
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Student registrations will appear here.
                  </p>

                </div>
              )}

            {/* Table */}
            {!loading &&
              !error &&
              registrations.length > 0 && (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[900px] text-left">

                    <thead className="bg-gray-50">

                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          ID
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Student
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Email
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          College
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Event
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Date
                        </th>
                      </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {registrations.map((registration) => (

                        <tr
                          key={registration.id}
                          className="transition hover:bg-gray-50"
                        >

                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            #{registration.id}
                          </td>

                          <td className="px-6 py-4">

                            <p className="font-semibold text-gray-900">
                              {registration.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {registration.phone || "No phone"}
                            </p>

                          </td>

                          <td className="px-6 py-4 text-sm text-gray-700">
                            {registration.email}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-700">
                            {registration.college || "-"}
                          </td>

                          <td className="px-6 py-4">

                            <p className="font-semibold text-gray-900">
                              {registration.event_title ||
                                `Event #${registration.event_id}`}
                            </p>

                            <p className="mt-1 text-sm text-indigo-600">
                              {registration.category || "-"}
                            </p>

                          </td>

                          <td className="px-6 py-4 text-sm text-gray-700">
                            {registration.registered_at
                              ? new Date(
                                  registration.registered_at
                                ).toLocaleDateString()
                              : "-"}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>
              )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;