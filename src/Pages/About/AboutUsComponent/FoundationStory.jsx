export default function FoundationStory({ friendSrc}) {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6 flex flex-col-reverse md:flex-row items-center mt-8 rounded-2xl bg-gray-100 gap-10">
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
        <p className="text-gray-700">
          In <span className="font-semibold text-indigo-600">June 2025</span>, four friends came together with a powerful dream — to build something that could truly change how people grow in their careers.
        </p>
        <p className="text-gray-700">
          That belief became the foundation of <span className="font-semibold text-indigo-600">Careerly</span> — a free, simple, and accessible platform.
        </p>
      </div>
      <figure className="flex-1 flex justify-center">
        <img
          src={friendSrc}
          alt="Founding Friends"
          className="rounded-xl shadow-lg w-72 h-72 object-cover md:w-96 md:h-96"
        />
      </figure>
    </section>
  );
}