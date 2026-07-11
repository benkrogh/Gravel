const crew = [
  { id: "1", name: "Marcus", initials: "MT", color: "#5e8d27" },
  { id: "2", name: "Elena", initials: "ER", color: "#1b3012" },
  { id: "3", name: "Devon", initials: "DK", color: "#737373" },
  { id: "4", name: "Sam", initials: "SL", color: "#a3a3a3" },
];

export function CrewSection() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-text-primary">Crew</h2>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {crew.map((member) => (
          <button
            key={member.id}
            type="button"
            className="flex shrink-0 flex-col items-center gap-2"
          >
            <div
              className="flex size-14 items-center justify-center rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: member.color }}
            >
              {member.initials}
            </div>
            <span className="text-sm text-text-secondary">{member.name}</span>
          </button>
        ))}
        <button
          type="button"
          className="flex shrink-0 flex-col items-center gap-2"
        >
          <div className="flex size-14 items-center justify-center rounded-full border-2 border-dashed border-neutral-300 text-neutral-400">
            <span className="text-xl leading-none">+</span>
          </div>
          <span className="text-sm text-text-tertiary">Add</span>
        </button>
      </div>
    </section>
  );
}
