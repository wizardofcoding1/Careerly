export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20 px-6 text-center text-white rounded-2xl shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Careerly</h1>
        <p className="text-lg md:text-xl">
          Built by friends, designed for everyone — your personal career companion to learn, grow, and succeed.
        </p>
      </div>
    </section>
  );
}