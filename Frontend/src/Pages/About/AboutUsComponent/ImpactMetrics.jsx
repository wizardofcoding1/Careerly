export default function ImpactMetrics({ impact }) {
    return (
        <section className="py-16 px-6 bg-white mt-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-10">Our Impact</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {impact.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl shadow-md hover:shadow-lg bg-indigo-50"
                    >
                        <h3 className="text-3xl font-extrabold text-indigo-600">
                            {item.number}
                        </h3>
                        <p className="text-gray-700 mt-2">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
