import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import Button from "../components/ui/Button";
import ApplicationsToolbar from "../components/applications/ApplicationsToolbar";
import ApplicationsTable from "../components/applications/ApplicationsTable";

function Applications() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Applications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track and manage your job applications.
          </p>
        </div>

        <Link to="/applications/new">
    <Button>
        <Plus size={18} />
        Add Application
    </Button>
</Link>
      </div>

      <ApplicationsToolbar />

      <ApplicationsTable
  applications={applications}
  onDelete={handleDelete}
/>
    </div>
  );
}

export default Applications;