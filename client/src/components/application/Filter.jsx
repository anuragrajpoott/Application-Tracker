// src/components/Filters.jsx

import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";

import { OPTIONS } from "../utils/constants.js";

export default function Filters({
  filters,
  onChange,
  onReset,
}) {
  function handleChange(e) {
    const { name, value } = e.target;

    onChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <Input
          name="search"
          placeholder="Search company or role..."
          value={filters.search}
          onChange={handleChange}
        />

        <Select
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Statuses</option>
          {OPTIONS.status.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Select
          name="platform"
          value={filters.platform}
          onChange={handleChange}
        >
          <option value="">All Platforms</option>
          {OPTIONS.platform.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Select
          name="workMode"
          value={filters.workMode}
          onChange={handleChange}
        >
          <option value="">All Work Modes</option>
          {OPTIONS.workMode.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
        >
          <option value="createdAt">Newest</option>
          <option value="appliedDate">Applied Date</option>
          <option value="company">Company</option>
          <option value="role">Role</option>
          <option value="status">Status</option>
        </Select>

        <Button
          type="button"
          variant="secondary"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}