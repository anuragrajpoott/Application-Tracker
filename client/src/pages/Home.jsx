// src/pages/Home.jsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../api/applicationApi";

import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import SummaryCards from "../components/home/SummaryCards";
import Charts from "../components/home/Charts";
import Filters from "../components/home/Filters";
import ApplicationsTable from "../components/home/ApplicationsTable";
import ApplicationForm from "../components/forms/ApplicationForm";
import Pagination from "../components/ui/Pagination";

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
    fetchApplications();
  }, [page, filters]);

  async function fetchApplications() {
    setLoading(true);

    try {
      const response = await getApplications({
        page,
        ...filters,
      });

      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setSelectedApplication(null);
    setIsModalOpen(true);
  }

  function openEditModal(application) {
    setSelectedApplication(application);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedApplication(null);
    setIsModalOpen(false);
  }

  async function handleSubmit(formData) {
    setSubmitting(true);

    try {
      if (selectedApplication) {
        await updateApplication(selectedApplication._id, formData);

        toast.success("Application updated successfully.");
      } else {
        await createApplication(formData);

        toast.success("Application created successfully.");
      }

      closeModal();
      fetchApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to save application."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(application) {
    const confirmed = window.confirm(
      `Delete application for "${application.company}"?`
    );

    if (!confirmed) return;

    try {
      await deleteApplication(application._id);

      toast.success("Application deleted successfully.");

      fetchApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete application."
      );
    }
  }

  function handleFiltersChange(updatedFilters) {
    setPage(1);
    setFilters(updatedFilters);
  }

  function handleFiltersReset() {
    setPage(1);
    setFilters(INITIAL_FILTERS);
  }

  function handlePageChange(nextPage) {
    setPage(nextPage);
  }

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

      <Filters
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
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={isModalOpen}
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