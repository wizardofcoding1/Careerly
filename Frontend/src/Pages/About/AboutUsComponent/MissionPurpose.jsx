export default function MissionPurpose() {
  return (
    <section className="bg-white py-12 px-6 mt-8 rounded-2xl shadow-lg">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="p-6 bg-indigo-50 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-indigo-600 mb-2">Our Mission</h3>
          <p className="text-gray-700">To empower students and professionals worldwide with free career tools and resources.</p>
        </div>
        <div className="p-6 bg-violet-50 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-violet-600 mb-2">Why Careerly?</h3>
          <p className="text-gray-700">Careerly was built not as a business, but as a community project — designed to guide and support learners at every step.</p>
        </div>
      </div>
    </section>
  );
}