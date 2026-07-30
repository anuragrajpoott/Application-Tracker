// src/pages/Home.jsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
} from "../api/applicationApi";

import ApplicationForm from "../components/application/ApplicationForm";
import ApplicationsTable from "../components/application/ApplicationsTable";
import Filter from "../components/application/Filter";
import SummaryCards from "../components/application/SummaryCards";

import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Modal from "../components/ui/Modal";

const INITIAL_FILTERS = {
  search: "",
  status: "",
  platform: "",
  sort: "newest",
};

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  const fetchApplications = async () => {
    setLoading(true);

    try {
      setApplications(await getApplications(filters));
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (application = null) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);

    try {
      if (selectedApplication) {
        await updateApplication(selectedApplication._id, data);
        toast.success("Application updated.");
      } else {
        await createApplication(data);
        toast.success("Application added.");
      }

      closeModal();
      fetchApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to save application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (application) => {
    if (
      !window.confirm(
        `Delete "${application.company}"?`
      )
    ) {
      return;
    }

    try {
      await deleteApplication(application._id);

      toast.success("Application deleted.");
      fetchApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete application."
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Job Applications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your applications in one place.
          </p>
        </div>

        <Button onClick={() => openModal()}>
          + Add Application
        </Button>
      </header>

      <SummaryCards applications={applications} />

      <Filter
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(INITIAL_FILTERS)}
      />

      <ApplicationsTable
        applications={applications}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={
          selectedApplication
            ? "Edit Application"
            : "Add Application"
        }
      >
        <ApplicationForm
          application={selectedApplication}
          loading={submitting}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}