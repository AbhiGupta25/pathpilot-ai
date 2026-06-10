type Props = {
  title: string;
  items: string[];
};

export function RoadmapCard({ title, items }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <ol className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
