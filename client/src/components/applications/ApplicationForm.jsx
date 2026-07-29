import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../ui/Button";
import FormField from "../ui/FormField";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

import {
  STATUS_OPTIONS,
  PLATFORM_OPTIONS,
  WORK_MODE_OPTIONS,
  PRIORITY_OPTIONS,
} from "../../utils/constants";

function ApplicationForm({
  defaultValues = {},
  onSubmit,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Company"
          required
          error={errors.company?.message}
        >
          <Input
            {...register("company", {
              required: "Company is required",
            })}
          />
        </FormField>

        <FormField
          label="Role"
          required
          error={errors.role?.message}
        >
          <Input
            {...register("role", {
              required: "Role is required",
            })}
          />
        </FormField>

        <FormField label="Platform">
          <Select {...register("platform")}>
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Status">
          <Select {...register("status")}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Work Mode">
          <Select {...register("workMode")}>
            {WORK_MODE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Priority">
          <Select {...register("priority")}>
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Applied Date">
          <Input
            type="date"
            {...register("appliedDate")}
          />
        </FormField>

        <FormField label="Job URL">
          <Input
            type="url"
            placeholder="https://..."
            {...register("jobUrl")}
          />
        </FormField>
      </div>

      <FormField label="Notes">
        <Textarea
          rows={5}
          {...register("notes")}
        />
      </FormField>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          Save Application
        </Button>
      </div>
    </form>
  );
}

export default ApplicationForm;