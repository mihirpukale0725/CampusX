import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";

function Events() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || "All"
  );

  const [search, setSearch] = useState("");

  // Backend/API state
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from PostgreSQL through Express API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/events"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Unable to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = [
    "All",
    "Hackathon",
    "Coding Contest",
    "Workshop",
    "Seminar",
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Explore CampusX
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Discover Campus Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Find hackathons, coding contests, workshops and other
            opportunities happening around you.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 flex max-w-2xl rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="flex-1 bg-transparent px-5 py-3 outline-none"
            />

            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
            >
              Search
            </button>

          </div>

        </div>
      </section>

      {/* Events */}
      <main className="mx-auto max-w-7xl px-6 py-16">

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);

                if (category === "All") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category });
                }
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        {/* Heading */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold text-gray-900">
            Upcoming Events
          </h2>

          <p className="mt-2 text-gray-500">
            {loading
              ? "Loading events..."
              : `${filteredEvents.length} events found`}
          </p>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-12 rounded-2xl bg-white py-20 text-center">

            <div className="text-4xl">
              ⏳
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Loading events...
            </h3>

            <p className="mt-2 text-gray-500">
              Fetching the latest events from CampusX.
            </p>

          </div>

        ) : error ? (

          /* Error */
          <div className="mt-12 rounded-2xl border border-red-200 bg-white py-20 text-center">

            <div className="text-4xl">
              ⚠️
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load events
            </h3>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

          </div>

        ) : filteredEvents.length > 0 ? (

          /* Event Cards */
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
              />
            ))}

          </div>

        ) : (

          /* No Events */
          <div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              No events found
            </h3>

            <p className="mt-2 text-gray-500">
              Try a different search or category.
            </p>

          </div>

        )}

      </main>
    </div>
  );
}

export default Events;