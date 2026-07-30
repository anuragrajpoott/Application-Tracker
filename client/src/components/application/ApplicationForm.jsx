// src/components/ApplicationForm.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import Textarea from "./Textarea.jsx";

import { OPTIONS } from "../utils/constants.js";

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

  const renderError = (field) =>
    errors[field] && (
      <p className="mt-1 text-sm text-red-600">
        {errors[field].message}
      </p>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Company *
          </label>
          <Input
            {...register("company", {
              required: "Company is required",
            })}
          />
          {renderError("company")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Role *
          </label>
          <Input
            {...register("role", {
              required: "Role is required",
            })}
          />
          {renderError("role")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
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
          <label className="mb-2 block text-sm font-medium">
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
          <label className="mb-2 block text-sm font-medium">
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
          <label className="mb-2 block text-sm font-medium">
            Employment Type
          </label>
          <Select {...register("employmentType")}>
            {OPTIONS.employmentType.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
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
          <label className="mb-2 block text-sm font-medium">
            Location
          </label>
          <Input {...register("location")} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Salary
          </label>
          <Input
            type="number"
            min={0}
            {...register("salary", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Salary must be at least 0",
              },
            })}
          />
          {renderError("salary")}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Currency
          </label>
          <Select {...register("currency")}>
            {OPTIONS.currency.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Applied Date
          </label>
          <Input type="date" {...register("appliedDate")} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Deadline
          </label>
          <Input type="date" {...register("deadline")} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Follow-up Date
          </label>
          <Input type="date" {...register("followUpDate")} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Job URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com"
            {...register("jobUrl", {
              pattern: {
                value: /^https?:\/\/.+$/i,
                message: "Enter a valid URL",
              },
            })}
          />
          {renderError("jobUrl")}
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              {...register("referred")}
            />
            Referred
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Notes
          </label>
          <Textarea rows={5} {...register("notes")} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          {application ? "Update Application" : "Add Application"}
        </Button>
      </div>
    </form>
  );
}