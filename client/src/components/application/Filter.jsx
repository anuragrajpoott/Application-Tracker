// src/components/application/Filter.jsx

import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

import {
  PLATFORM_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from "../../utils/constants";

export default function Filter({
  filters,
  onChange,
  onReset,
}) {
  const handleChange = ({ target: { name, value } }) => {
    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <Input
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleChange}
        />

        <Select
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>

        <Select
          name="platform"
          value={filters.platform}
          onChange={handleChange}
        >
          <option value="">All Platforms</option>
          {PLATFORM_OPTIONS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </Select>

        <Select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
        >
          {SORT_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
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