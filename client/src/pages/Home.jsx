// src/pages/Home.jsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
} from "../api/applicationApi";

import Charts from "../components/application/Charts";
import Filter from "../components/application/Filter";
import SummaryCards from "../components/application/SummaryCards";
import ApplicationsTable from "../components/application/ApplicationsTable";
import ApplicationForm from "../components/application/ApplicationForm";
import Pagination from "../components/pagination/Pagination";

import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Modal from "../components/ui/Modal";

const INITIAL_FILTERS = {
  search: "",
  status: "",
  platform: "",
  workMode: "",
  sortBy: "createdAt-desc",
};

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    loadApplications();
  }, [page, filters]);

  const loadApplications = async () => {
    setLoading(true);

    try {
      const { data } = await getApplications({
        page,
        ...filters,
      });

      setApplications(data.applications);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(true);
  };

  const openEditModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);

    try {
      if (selectedApplication) {
        await updateApplication(
          selectedApplication._id,
          formData
        );

        toast.success("Application updated successfully.");
      } else {
        await createApplication(formData);

        toast.success("Application created successfully.");
      }

      closeModal();
      await loadApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to save application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (application) => {
    const confirmed = window.confirm(
      `Delete application for "${application.company}"?`
    );

    if (!confirmed) return;

    try {
      await deleteApplication(application._id);

      toast.success("Application deleted successfully.");

      await loadApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  const handleFiltersChange = (updatedFilters) => {
    setPage(1);
    setFilters(updatedFilters);
  };

  const handleFiltersReset = () => {
    setPage(1);
    setFilters(INITIAL_FILTERS);
  };

  const modalTitle = selectedApplication
    ? "Edit Application"
    : "Add Application";

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Job Application Tracker
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage, organize and track all your job applications in one place.
          </p>
        </div>

        <Button onClick={openCreateModal}>
          Add Application
        </Button>
      </div>

      <SummaryCards applications={applications} />

      <Charts applications={applications} />

      <Filter
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleFiltersReset}
      />

      <ApplicationsTable
        applications={applications}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
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