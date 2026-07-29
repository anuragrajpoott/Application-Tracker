import {
  BriefcaseBusiness,
  Clock3,
  CircleCheck,
  CircleX,
  Gift,
  Search,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

function SummaryCards({ applications }) {
  const total = applications.length;

  const wishlist = applications.filter(
    (app) => app.status === "Wishlist"
  ).length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview Scheduled"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <SummaryCard
        title="Total Applications"
        value={total}
        icon={BriefcaseBusiness}
      />

      <SummaryCard
        title="Wishlist"
        value={wishlist}
        icon={Search}
      />

      <SummaryCard
        title="Applied"
        value={applied}
        icon={Clock3}
      />

      <SummaryCard
        title="Interviews"
        value={interviews}
        icon={CircleCheck}
      />

      <SummaryCard
        title="Offers"
        value={offers}
        icon={Gift}
        iconColor="text-green-600"
      />

      <SummaryCard
        title="Rejected"
        value={rejected}
        icon={CircleX}
        iconColor="text-red-600"
      />
    </div>
  );
}

export default SummaryCards;