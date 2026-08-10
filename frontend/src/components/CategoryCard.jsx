function CategoryCard({ icon, title, description }) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
      
      {/* Icon */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:bg-indigo-100">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

      {/* Explore */}
      <div className="mt-4 text-sm font-semibold text-indigo-600">
        Explore →
      </div>
    </div>
  );
}

export default CategoryCard;