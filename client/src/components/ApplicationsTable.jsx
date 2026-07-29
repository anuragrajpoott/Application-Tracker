import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

import ApplicationRow from "./ApplicationRow";

function ApplicationsTable({ applications, onDelete }) {
  if (!applications.length) {
    return (
      <EmptyState
        title="No applications found"
        description="Try changing your search or filters."
      />
    );
  }

  return (
    <Card className="overflow-x-auto p-0">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-700">
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Platform</th>
            <th className="px-4 py-3">Applied</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <ApplicationRow
              key={application._id}
              application={application}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ApplicationsTable;