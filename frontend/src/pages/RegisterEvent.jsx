import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function RegisterEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get logged-in student
  const storedUser = JSON.parse(
    localStorage.getItem("campusxUser") || "null"
  );

  const isLoggedIn =
    localStorage.getItem("campusxLoggedIn") === "true";

  // Fetch event from backend
  useEffect(() => {
    if (!isLoggedIn || !storedUser) {
      navigate("/login");
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/events/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Event not found"
          );
        }

        setEvent(data);

        // Pre-fill student information
        setFormData({
          name: storedUser.name || "",
          email: storedUser.email || "",
          college: storedUser.college || "",
          phone: "",
        });
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Unable to load this event.");
      } finally {
        setLoadingEvent(false);
      }
    };

    fetchEvent();
  }, [id, isLoggedIn, navigate, storedUser?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !storedUser) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_id: Number(id),
            name: formData.name,
            email: formData.email,
            college: formData.college,
            phone: formData.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to complete registration."
        );
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        "Unable to connect to CampusX server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading event
  if (loadingEvent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl">⏳</div>

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

  // Event not found
  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Event Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "The event does not exist."}
          </p>

          <Link
            to="/events"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  // Successful registration
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="text-6xl">
            🎉
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Registration Successful!
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            You have successfully registered for{" "}
            <span className="font-semibold text-gray-900">
              {event.title}
            </span>
            .
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              to="/student/dashboard"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              View Dashboard
            </Link>

            <Link
              to="/events"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Browse Events
            </Link>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-2xl">

        {/* Back */}
        <Link
          to={`/events/${id}`}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Event
        </Link>

        {/* Form Card */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">

          {/* Header */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              CampusX Registration
            </p>

            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              Register for Event
            </h1>

            {/* Event Information */}
            <div className="mt-6 rounded-xl bg-indigo-50 p-4">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  {event.category === "Hackathon"
                    ? "🚀"
                    : event.category === "Coding Contest"
                    ? "💻"
                    : "🛠️"}
                </span>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    {event.category}
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {event.title}
                  </p>

                </div>

              </div>

            </div>

            <p className="mt-3 leading-7 text-gray-600">
              Confirm your details below to register for this event.
            </p>

          </div>

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* College */}
            <div>

              <label
                htmlFor="college"
                className="block text-sm font-semibold text-gray-700"
              >
                College / University
              </label>

              <input
                id="college"
                name="college"
                type="text"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter your college name"
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* Phone */}
            <div>

              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Submitting..."
                : "Submit Registration"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default RegisterEvent;