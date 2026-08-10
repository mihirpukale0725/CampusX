import { Link } from "react-router-dom";

function EventCard({
  id,
  category,
  title,
  date,
  location,
  registrations,
  description,
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Event Image */}
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <span className="text-6xl">
          {category === "Hackathon"
            ? "🚀"
            : category === "Coding Contest"
              ? "💻"
              : "🛠️"}
        </span>
      </div>

      {/* Event Content */}
      <div className="p-6">

        {/* Category */}
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {category}
        </span>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold text-gray-900">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {description}
        </p>

        {/* Event Details */}
        <div className="mt-5 space-y-2 text-sm text-gray-600">
          <p>
            📅 <span className="font-medium">{date}</span>
          </p>

          <p>
            📍 <span className="font-medium">{location}</span>
          </p>

          <p>
            👥{" "}
            <span className="font-medium">
              {registrations} registered
            </span>
          </p>
        </div>

        {/* View Event */}
        <Link
          to={`/events/${id}`}
          className="mt-6 block w-full rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
        >
          View Event
        </Link>

      </div>
    </div>
  );
}

export default EventCard;