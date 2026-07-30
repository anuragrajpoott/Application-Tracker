// src/components/application/SummaryCards.jsx

export default function SummaryCards({ applications }) {
  const summary = applications.reduce(
    (counts, { status }) => {
      counts.total += 1;

      switch (status) {
        case "Applied":
          counts.applied += 1;
          break;
        case "Interview Scheduled":
          counts.interviews += 1;
          break;
        case "Offer":
          counts.offers += 1;
          break;
        case "Rejected":
          counts.rejected += 1;
          break;
        default:
          break;
      }

      return counts;
    },
    {
      total: 0,
      applied: 0,
      interviews: 0,
      offers: 0,
      rejected: 0,
    }
  );

  const cards = [
    { title: "Total", value: summary.total },
    { title: "Applied", value: summary.applied },
    { title: "Interviews", value: summary.interviews },
    { title: "Offers", value: summary.offers },
    { title: "Rejected", value: summary.rejected },
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