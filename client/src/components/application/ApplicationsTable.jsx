// src/components/application/ApplicationsTable.jsx

import { Pencil, Trash2 } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })
    : "—";

const getFollowUpStatus = (date) => {
  if (!date) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followUp = new Date(date);
  followUp.setHours(0, 0, 0, 0);

  const diff =
    (followUp - today) / (1000 * 60 * 60 * 24);

  if (diff < 0) return "🔴";
  if (diff === 0) return "🟡";

  return "⚪";
};

export default function ApplicationsTable({
  applications,
  onEdit,
  onDelete,
}) {
  if (!applications.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          No applications yet
        </h2>

        <p className="mt-2 text-slate-500">
          Click "Add Application" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 border-b bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-600">
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Platform</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Applied</th>
              <th className="px-5 py-3">Follow-up</th>
              <th className="px-5 py-3 text-center">Ref</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-medium text-slate-900">
                  {application.company}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {application.role}
                </td>

                <td className="px-5 py-4">
                  <Badge status={application.status} />
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {application.platform}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {application.location || "—"}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {formatDate(application.appliedDate)}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {application.followUpDate
                    ? `${getFollowUpStatus(
                        application.followUpDate
                      )} ${formatDate(
                        application.followUpDate
                      )}`
                    : "—"}
                </td>

                <td className="px-5 py-4 text-center">
                  {application.referred ? "✓" : "—"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(application)}
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => onDelete(application)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}