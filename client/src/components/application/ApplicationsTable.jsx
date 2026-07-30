// src/components/ApplicationsTable.jsx

import { Pencil, Trash2 } from "lucide-react";

import Badge from "./Badge.jsx";
import Button from "./Button.jsx";

export default function ApplicationsTable({
  applications,
  onEdit,
  onDelete,
}) {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          No applications found
        </h2>

        <p className="mt-2 text-slate-500">
          Add your first job application to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4">Applied</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-b last:border-0 hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {application.company}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {application.role}
                </td>

                <td className="px-6 py-4">
                  <Badge status={application.status} />
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {application.platform}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {application.appliedDate
                    ? new Date(application.appliedDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(application)}
                      aria-label="Edit application"
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => onDelete(application)}
                      aria-label="Delete application"
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