import Select from "../ui/Select";

function FilterSelect({
  value,
  onChange,
  options,
  placeholder = "All",
}) {
  return (
    <Select
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </Select>
  );
}

export default FilterSelect;