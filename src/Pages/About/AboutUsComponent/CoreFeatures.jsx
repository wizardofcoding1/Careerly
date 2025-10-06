export default function CoreFeatures({ features }) {
    return (
        <section className="max-w-6xl mx-auto py-8 px-6 rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-10">
                Core Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md hover:shadow-xl transition-all bg-white"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold text-center text-slate-800">
                            {feature.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
