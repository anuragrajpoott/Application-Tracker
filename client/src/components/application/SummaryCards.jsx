// src/components/SummaryCards.jsx

export default function SummaryCards({ applications }) {
  const total = applications.length;

  const applied = applications.filter(
    ({ status }) => status === "Applied"
  ).length;

  const interviews = applications.filter(
    ({ status }) => status === "Interview Scheduled"
  ).length;

  const offers = applications.filter(
    ({ status }) => status === "Offer"
  ).length;

  const rejected = applications.filter(
    ({ status }) => status === "Rejected"
  ).length;

  const cards = [
    {
      title: "Total",
      value: total,
    },
    {
      title: "Applied",
      value: applied,
    },
    {
      title: "Interviews",
      value: interviews,
    },
    {
      title: "Offers",
      value: offers,
    },
    {
      title: "Rejected",
      value: rejected,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map(({ title, value }) => (
        <div
          key={title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
}