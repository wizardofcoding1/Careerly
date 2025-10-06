export default function Acknowledgments({ acknowledgments }) {
    return (
        <section className="bg-gray-100 py-16 px-6 mt-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-10">
                Acknowledgments
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {acknowledgments.map((ack, index) => (
                    <p key={index} className="text-gray-700 text-center">
                        {ack}
                    </p>
                ))}
            </div>
        </section>
    );
}
