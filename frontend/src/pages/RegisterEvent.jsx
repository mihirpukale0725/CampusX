import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function RegisterEvent() {
  const { id } = useParams();
  const events = {
  1: {
    title: "CampusX Build Challenge",
    category: "Hackathon",
    emoji: "🚀",
  },
  2: {
    title: "CodeSprint 2026",
    category: "Coding Contest",
    emoji: "💻",
  },
  3: {
    title: "Full Stack Development Workshop",
    category: "Workshop",
    emoji: "🛠️",
  },
};

const event = events[id];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="text-6xl">🎉</div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Registration Successful!
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            You have successfully registered for this event.
            We will send further details to your registered email.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              to={`/events/${id}`}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Back to Event
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

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              CampusX Registration
            </p>

            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              Register for Event
            </h1>
          <div className="mt-6 rounded-xl bg-indigo-50 p-4">
  <div className="flex items-center gap-3">
    <span className="text-3xl">{event?.emoji}</span>

    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
        {event?.category}
      </p>

      <p className="mt-1 font-bold text-gray-900">
        {event?.title}
      </p>
    </div>
  </div>
</div>
            <p className="mt-3 leading-7 text-gray-600">
              Enter your details below to register for this event.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

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

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700"
            >
              Submit Registration
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default RegisterEvent;