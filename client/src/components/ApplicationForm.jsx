import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

import { OPTIONS } from "../utils/constants";

export default function ApplicationForm({
  application,
  onSubmit,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: application,
  });

  useEffect(() => {
    reset(application);
  }, [application, reset]);

  const renderError = (error) =>
    error ? (
      <p className="mt-1 text-sm text-red-600">{error.message}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company *
          </label>

          <Input
            {...register("company", {
              required: "Company is required",
            })}
          />

          {renderError(errors.company)}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role *
          </label>

          <Input
            {...register("role", {
              required: "Role is required",
            })}
          />

          {renderError(errors.role)}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Platform
          </label>

          <Select {...register("platform")}>
            {OPTIONS.platform.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <Select {...register("status")}>
            {OPTIONS.status.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Work Mode
          </label>

          <Select {...register("workMode")}>
            {OPTIONS.workMode.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Priority
          </label>

          <Select {...register("priority")}>
            {OPTIONS.priority.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Applied Date
          </label>

          <Input type="date" {...register("appliedDate")} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job URL
          </label>

          <Input
            type="url"
            placeholder="https://example.com"
            {...register("jobUrl")}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Notes
        </label>

        <Textarea rows={5} {...register("notes")} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          {application ? "Update Application" : "Add Application"}
        </Button>
      </div>
    </form>
  );
}