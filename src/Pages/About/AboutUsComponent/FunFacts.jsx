export default function FunFacts({ funFacts }) {
    return (
        <section className="bg-white py-16 px-6 mt-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-10">
                Behind the Scenes
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {funFacts.map((fact, index) => (
                    <div
                        key={index}
                        className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-lg"
                    >
                        <div className="flex justify-center mb-3">
                            {fact.icon}
                        </div>
                        <p className="text-gray-700 text-sm">{fact.fact}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
