// src/components/application/ApplicationForm.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  PLATFORM_OPTIONS,
  STATUS_OPTIONS,
} from "../../utils/constants";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

const defaultValues = {
  company: "",
  role: "",
  status: "Applied",
  platform: "LinkedIn",
  location: "",
  appliedDate: new Date().toISOString().split("T")[0],
  followUpDate: new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0],
  referred: false,
  jobUrl: "",
  notes: "",
};

export default function ApplicationForm({
  application,
  onSubmit,
  loading = false,
}) {
  const [showMore, setShowMore] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(application ?? defaultValues);
  }, [application, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Company *"
          {...register("company", {
            required: "Company is required.",
          })}
          error={errors.company?.message}
        />

        <Input
          label="Role *"
          {...register("role", {
            required: "Role is required.",
          })}
          error={errors.role?.message}
        />

        <Select
          label="Status"
          {...register("status")}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </Select>

        <Select
          label="Platform"
          {...register("platform")}
        >
          {PLATFORM_OPTIONS.map((platform) => (
            <option key={platform}>{platform}</option>
          ))}
        </Select>
      </div>

      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        {showMore
          ? "Hide Additional Details"
          : "Additional Details"}
      </button>

      {showMore && (
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Location"
            {...register("location")}
          />

          <Input
            type="date"
            label="Applied Date"
            {...register("appliedDate")}
          />

          <Input
            type="date"
            label="Follow-up"
            {...register("followUpDate")}
          />

          <Input
            type="url"
            label="Job URL"
            {...register("jobUrl")}
          />

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              {...register("referred")}
            />
            Referred
          </label>

          <div className="md:col-span-2">
            <Textarea
              label="Notes"
              rows={4}
              {...register("notes")}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          {application ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
}