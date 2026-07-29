import ApplicationCard from "./ApplicationCard";
import EmptyState from "../ui/EmptyState";

function ApplicationsGrid({
  applications,
  onDelete,
}) {
  if (!applications.length) {
    return (
      <EmptyState
        title="No applications found"
        description="Try changing your search or filters."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {applications.map((application) => (
        <ApplicationCard
          key={application._id}
          application={application}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ApplicationsGrid;