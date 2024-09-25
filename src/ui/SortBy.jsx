import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const selectedValue = searchParams.get("sortBy") || "";
  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={handleChange}
      type="white"
    ></Select>
  );
}

export default SortBy;
