import RegisterEvent from "./pages/RegisterEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryCard from "./components/CategoryCard";
import EventCard from "./components/EventCard";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20">
          <div className="w-full text-center">

            <div className="mb-8 inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
              🚀 Your campus opportunities, all in one place
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
              Discover.
              <span className="text-indigo-600"> Participate.</span>
              <br />
              Grow.
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
              Discover hackathons, coding contests, workshops, college events
              and opportunities happening around you.
            </p>

            {/* Search */}
            <div className="mx-auto mt-12 flex max-w-3xl items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
              <input
                type="text"
                placeholder="Search events, hackathons, workshops..."
                className="flex-1 bg-transparent px-5 py-4 text-gray-700 outline-none placeholder:text-gray-400"
              />

              <button className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-700">
                Search
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-700">
                Explore Events
              </button>

              <button className="rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-gray-700 transition hover:bg-gray-50">
                Create an Event
              </button>
            </div>

          </div>
        </section>

        {/* Event Categories */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">

            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Explore Opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Something for every student
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Discover events and opportunities that match your interests,
                skills and career goals.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <CategoryCard
                icon="💻"
                title="Coding Contests"
                description="Test your problem-solving skills and compete with other students."
              />

              <CategoryCard
                icon="🏆"
                title="Hackathons"
                description="Build innovative projects, collaborate with teams and compete for prizes."
              />

              <CategoryCard
                icon="🛠️"
                title="Workshops"
                description="Learn practical skills through hands-on technical and non-technical workshops."
              />

              <CategoryCard
                icon="🎓"
                title="Seminars"
                description="Attend expert talks, technical sessions and knowledge-sharing events."
              />

              <CategoryCard
                icon="🎨"
                title="Cultural Events"
                description="Discover cultural, creative and social events happening across campuses."
              />

              <CategoryCard
                icon="🚀"
                title="Opportunities"
                description="Find internships, programs, competitions and other student opportunities."
              />

            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                  Featured Events
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  What's happening on campus?
                </h2>

                <p className="mt-4 max-w-2xl text-gray-600">
                  Discover upcoming events, hackathons and competitions
                  happening across campuses.
                </p>
              </div>

              <a
                href="/events"
                className="w-fit rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                View All Events →
              </a>

            </div>

            {/* Three Different Events */}
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              <EventCard
                id={1}
                category="Hackathon"
                title="CampusX Build Challenge"
                date="24 August 2026"
                location="SPIT, Mumbai"
                registrations="120"
                description="Build an innovative solution to a real-world problem and compete with talented student teams."
              />

              <EventCard
                id={2}
                category="Coding Contest"
                title="CodeSprint 2026"
                date="28 August 2026"
                location="Online"
                registrations="250"
                description="Test your DSA and problem-solving skills in this competitive programming challenge."
              />

              <EventCard
                id={3}
                category="Workshop"
                title="Full Stack Development Workshop"
                date="2 September 2026"
                location="SPIT, Mumbai"
                registrations="85"
                description="Learn how modern full-stack applications are designed, developed and deployed."
              />

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/events" element={<Events />} />
  <Route path="/events/:id" element={<EventDetails />} />

  <Route
    path="/events/:id/register"
    element={<RegisterEvent />}
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;