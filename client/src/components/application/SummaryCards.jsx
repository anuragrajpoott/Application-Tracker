// src/components/application/SummaryCards.jsx

export default function SummaryCards({ applications }) {
  const summary = applications.reduce(
    (counts, { status }) => {
      counts.total += 1;

      if (status === "Wishlist" || status === "Applied") {
        counts.active += 1;
      }

      if (status === "Interview") {
        counts.interviews += 1;
      }

      if (status === "Offer") {
        counts.offers += 1;
      }

      return counts;
    },
    {
      total: 0,
      active: 0,
      interviews: 0,
      offers: 0,
    }
  );

  const cards = [
    { title: "Applications", value: summary.total },
    { title: "Active", value: summary.active },
    { title: "Interviews", value: summary.interviews },
    { title: "Offers", value: summary.offers },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, value }) => (
        <div
          key={title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
}