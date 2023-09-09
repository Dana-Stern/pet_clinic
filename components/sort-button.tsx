import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from "@mui/icons-material";
import { SortDirection } from "@tanstack/react-table";

type props = {
  isSorted: false | SortDirection;
  firstSortDir: SortDirection;
};
const SortButton = ({ isSorted, firstSortDir }: props) => {
  return (
    <div className="md:inline">
      {isSorted === "asc" ? (
        <ArrowDropUpIcon />
      ) : isSorted === "desc" ? (
        <ArrowDropDownIcon />
      ) : firstSortDir === "asc" ? (
        <ArrowDropUpIcon className="opacity-0 group-hover:opacity-60" />
      ) : firstSortDir === "desc" ? (
        <ArrowDropDownIcon className="opacity-0 group-hover:opacity-60" />
      ) : null}
    </div>
  );
};

export default SortButton;
