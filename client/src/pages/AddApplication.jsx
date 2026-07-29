import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createApplication } from "../api/applicationApi";
import ApplicationForm from "../components/applications/ApplicationForm";

function AddApplication() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createApplication(formData);

      toast.success("Application created successfully.");

      navigate("/applications");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create application."
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Add Application
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Track a new job application.
        </p>
      </div>

      <ApplicationForm
        onSubmit={handleCreate}
      />
    </div>
  );
}

export default AddApplication;