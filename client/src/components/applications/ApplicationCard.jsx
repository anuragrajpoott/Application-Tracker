import { Link } from "react-router-dom";
import {
  Calendar,
  Building2,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

function ApplicationCard({
  application,
  onDelete,
}) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {application.company}
            </h3>

            <p className="text-sm text-slate-500">
              {application.role}
            </p>
          </div>

          <Badge>{application.status}</Badge>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Building2 size={16} />
            <span>{application.platform}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>
              {new Date(
                application.appliedDate
              ).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {application.jobUrl && (
          <a
            href={application.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <ExternalLink size={16} />
              Open
            </Button>
          </a>
        )}

        <Link to={`/applications/${application._id}/edit`}>
          <Button variant="secondary">
            <Pencil size={16} />
            Edit
          </Button>
        </Link>

        <Button
          variant="danger"
          onClick={() => onDelete(application)}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default ApplicationCard;