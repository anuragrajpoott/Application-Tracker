import { Link } from "react-router-dom";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

function ApplicationRow({ application, onDelete }) {
  return (
    <tr className="border-b border-slate-200 last:border-none">
      <td className="px-4 py-4 font-medium text-slate-900">
        {application.company}
      </td>

      <td className="px-4 py-4">{application.role}</td>

      <td className="px-4 py-4">
        <Badge>{application.status}</Badge>
      </td>

      <td className="px-4 py-4">{application.platform}</td>

      <td className="px-4 py-4">
        {new Date(application.appliedDate).toLocaleDateString()}
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <ExternalLink size={16} />
              </Button>
            </a>
          )}

          <Link to={`/applications/${application._id}/edit`}>
            <Button variant="secondary" size="sm">
              <Pencil size={16} />
            </Button>
          </Link>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(application)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ApplicationRow;