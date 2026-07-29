import SearchInput from "../filters/SearchInput";
import FilterSelect from "../filters/FilterSelect";

import {
  STATUS_OPTIONS,
  PLATFORM_OPTIONS,
  WORK_MODE_OPTIONS,
} from "../../utils/constants";

function ApplicationsToolbar({
  search = "",
  filters = {},
  onSearchChange = () => {},
  onFilterChange = () => {},
}) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 lg:grid-cols-4">
      <SearchInput
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search company or role..."
      />

      <FilterSelect
        value={filters.status || ""}
        options={STATUS_OPTIONS}
        placeholder="All Statuses"
        onChange={(e) =>
          onFilterChange("status", e.target.value)
        }
      />

      <FilterSelect
        value={filters.platform || ""}
        options={PLATFORM_OPTIONS}
        placeholder="All Platforms"
        onChange={(e) =>
          onFilterChange("platform", e.target.value)
        }
      />

      <FilterSelect
        value={filters.workMode || ""}
        options={WORK_MODE_OPTIONS}
        placeholder="All Work Modes"
        onChange={(e) =>
          onFilterChange("workMode", e.target.value)
        }
      />
    </div>
  );
}

export default ApplicationsToolbar;