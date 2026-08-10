import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  const events = {
    1: {
      category: "Hackathon",
      emoji: "🚀",
      title: "CampusX Build Challenge",
      description:
        "Build an innovative solution to a real-world problem and compete with talented student teams from across campuses.",
      date: "24 August 2026",
      location: "SPIT, Mumbai",
      registrations: "120 Students",
      teamSize: "2 - 4 Members",
      registrationDeadline: "22 August 2026",
      about:
        "CampusX Build Challenge is a student-focused hackathon designed to encourage innovation, collaboration and practical problem solving.",
    },

    2: {
      category: "Coding Contest",
      emoji: "💻",
      title: "CodeSprint 2026",
      description:
        "Test your DSA and problem-solving skills in this competitive programming challenge and compete with talented coders.",
      date: "28 August 2026",
      location: "Online",
      registrations: "250 Students",
      teamSize: "Individual",
      registrationDeadline: "27 August 2026",
      about:
        "CodeSprint 2026 is a competitive programming contest focused on algorithms, data structures and problem solving.",
    },

    3: {
      category: "Workshop",
      emoji: "🛠️",
      title: "Full Stack Development Workshop",
      description:
        "Learn how modern full-stack applications are designed, developed and deployed using popular web technologies.",
      date: "2 September 2026",
      location: "SPIT, Mumbai",
      registrations: "85 Students",
      teamSize: "Individual",
      registrationDeadline: "1 September 2026",
      about:
        "This hands-on workshop introduces students to frontend development, backend APIs, databases and deployment.",
    },
  };

  const event = events[id];

  // Invalid event ID
  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="text-6xl">🔍</div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Event not found
          </h1>

          <p className="mt-3 text-gray-500">
            The event you are looking for does not exist.
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

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">

          {/* Back */}
          <Link
            to="/events"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Events
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-3">

            {/* Main Content */}
            <div className="lg:col-span-2">

              {/* Event Image */}
              <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
                <span className="text-8xl">
                  {event.emoji}
                </span>
              </div>

              {/* Category */}
              <span className="mt-8 inline-block rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                {event.category}
              </span>

              {/* Title */}
              <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
                {event.title}
              </h1>

              {/* Description */}
              <p className="mt-5 text-lg leading-8 text-gray-600">
                {event.description}
              </p>

              {/* Details */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <p className="text-sm text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {event.date}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {event.location}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <p className="text-sm text-gray-500">
                    Registrations
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {event.registrations}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <p className="text-sm text-gray-500">
                    Participation
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {event.teamSize}
                  </p>
                </div>

              </div>

              {/* About */}
              <div className="mt-12">

                <h2 className="text-2xl font-bold text-gray-900">
                  About this event
                </h2>

                <p className="mt-4 leading-8 text-gray-600">
                  {event.about}
                </p>

              </div>

            </div>

            {/* Registration Card */}
            <div>

              <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-gray-900">
                  Ready to participate?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Secure your spot and participate in this exciting event.
                </p>

               <Link
  to={`/events/${id}/register`}
  className="mt-6 block w-full rounded-xl bg-indigo-600 py-4 text-center font-semibold text-white transition hover:bg-indigo-700"
>
  Register Now
</Link>
                <div className="mt-6 border-t border-gray-100 pt-5">

                  <p className="text-sm text-gray-500">
                    Registration closes
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {event.registrationDeadline}
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default EventDetails;