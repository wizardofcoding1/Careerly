export default function TeamThoughts({ team }) {
  return (
    <section className="bg-gray-100 py-16 px-6 mt-8 rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-12">Team Thoughts While Building Careerly</h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-indigo-300" />
        <div className="space-y-12">
          {team.map((member, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-6 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover shadow-md z-10" />
              <div className="bg-white p-6 rounded-xl shadow-md max-w-sm z-10">
                <h3 className="font-bold text-lg text-slate-800">{member.name}</h3>
                <p className="text-sm text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-700 italic">“{member.thought}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}