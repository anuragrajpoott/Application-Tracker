import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
} from "../api/applicationApi";

import { OPTIONS } from "../utils/constants";

import ApplicationForm from "../components/ApplicationForm";
import ApplicationsTable from "../components/ApplicationsTable";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Select from "../components/Select";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [applicationToDelete, setApplicationToDelete] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);
      const data = await getApplications();

setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      if (selectedApplication) {
        await updateApplication(selectedApplication._id, formData);
      } else {
        await createApplication(formData);
      }

      await loadApplications();

      setShowForm(false);
      setSelectedApplication(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    if (!applicationToDelete) return;

    try {
      await deleteApplication(applicationToDelete._id);

      setApplications((prev) =>
        prev.filter((app) => app._id !== applicationToDelete._id)
      );

      setApplicationToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.role
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        !status || application.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, status]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Applications
          </h1>

          <p className="text-slate-500">
            Manage your job applications.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedApplication(null);
            setShowForm(true);
          }}
        >
          <Plus size={18} />
          Add Application
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>

          {OPTIONS.status.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <ApplicationsTable
        applications={filteredApplications}
        onEdit={(application) => {
          setSelectedApplication(application);
          setShowForm(true);
        }}
        onDelete={setApplicationToDelete}
      />

      <Modal
        open={showForm}
        title={
          selectedApplication
            ? "Update Application"
            : "Add Application"
        }
        onClose={() => {
          setShowForm(false);
          setSelectedApplication(null);
        }}
      >
        <ApplicationForm
          application={selectedApplication}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal
        open={!!applicationToDelete}
        title="Delete Application"
        onClose={() => setApplicationToDelete(null)}
      >
        <div className="space-y-6">
          <p className="text-slate-600">
            Are you sure you want to delete this application?
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setApplicationToDelete(null)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}