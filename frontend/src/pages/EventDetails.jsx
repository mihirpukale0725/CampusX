import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("campusxUser") || "null"
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/events/${id}`
        );

        if (!response.ok) {
          throw new Error("Event not found");
        }

        const data = await response.json();

        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Unable to load this event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const checkRegistration = async () => {
      if (!user?.email) {
        setCheckingRegistration(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/registrations/student/${encodeURIComponent(
            user.email
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to check registration");
        }

        const data = await response.json();

        const registrations = data.registrations || [];

        const alreadyRegistered = registrations.some(
          (registration) =>
            String(registration.event_id) === String(id)
        );

        setIsRegistered(alreadyRegistered);
      } catch (error) {
        console.error(
          "Error checking registration:",
          error
        );
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [id, user?.email]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">

          <div className="text-5xl">
            ⏳
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Loading event...
          </h2>

          <p className="mt-2 text-gray-500">
            Fetching event details from CampusX.
          </p>

        </div>
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="text-5xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Event Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "The event you are looking for does not exist."}
          </p>

          <Link
            to="/events"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Browse Events
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-5xl px-6">

          <Link
            to="/events"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Events
          </Link>

          <div className="mt-8">

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {event.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {event.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              {event.description}
            </p>

          </div>

        </div>

      </section>

      {/* Event Information */}
      <main className="mx-auto max-w-5xl px-6 py-12">

        <div className="grid gap-8 md:grid-cols-3">

          {/* Main Details */}
          <div className="md:col-span-2">

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                About This Event
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                {event.description}
              </p>

            </div>

          </div>

          {/* Event Info Card */}
          <div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-gray-900">
                Event Details
              </h2>

              <div className="mt-6 space-y-5">

                {/* Date */}
                <div>
                  <p className="text-sm text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    📅 {event.date}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    📍 {event.location}
                  </p>
                </div>

                {/* Registrations */}
                <div>
                  <p className="text-sm text-gray-500">
                    Registrations
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    👥 {event.registrations} students
                  </p>
                </div>

                {/* Category */}
                <div>
                  <p className="text-sm text-gray-500">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    🏷️ {event.category}
                  </p>
                </div>

              </div>

              {/* Registration Status */}
              {checkingRegistration ? (
                <div className="mt-8 rounded-xl bg-gray-100 px-6 py-4 text-center font-semibold text-gray-600">
                  Checking registration...
                </div>
              ) : isRegistered ? (
                <div className="mt-8">

                  <div className="rounded-xl bg-green-50 px-6 py-4 text-center font-semibold text-green-700">
                    ✓ You are already registered
                  </div>

                  <Link
                    to="/student/dashboard"
                    className="mt-3 block rounded-xl border border-gray-300 px-6 py-4 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    View Dashboard
                  </Link>

                </div>
              ) : (
                <Link
                  to={`/events/${event.id}/register`}
                  className="mt-8 block rounded-xl bg-indigo-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-indigo-700"
                >
                  Register for Event
                </Link>
              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default EventDetails;