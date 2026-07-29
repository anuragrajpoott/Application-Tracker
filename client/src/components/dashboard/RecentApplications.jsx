import { Link } from "react-router-dom";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

function RecentApplications({ applications }) {
  const recent = [...applications]
    .sort(
      (a, b) =>
        new Date(b.appliedDate) -
        new Date(a.appliedDate)
    )
    .slice(0, 5);

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Applications
        </h2>

        <Link
          to="/applications"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          View All
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-slate-500">
          No applications found.
        </p>
      ) : (
        <div className="space-y-4">
          {recent.map((application) => (
            <div
              key={application._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
            >
              <div>
                <h3 className="font-medium text-slate-900">
                  {application.company}
                </h3>

                <p className="text-sm text-slate-500">
                  {application.role}
                </p>
              </div>

              <Badge>{application.status}</Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecentApplications;