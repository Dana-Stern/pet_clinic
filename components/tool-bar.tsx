import { petType } from "@/lib/enums";
import { Clear as ClearIcon } from "@mui/icons-material";
import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type props = {
  ownerNameSearchValue: string;
  setOwnerNameSearchValue: (ownerNameSearchValue: string) => void;
  petNameSearchValue: string;
  setPetNameSearchValue: (petNameSearchValue: string) => void;
  selectedPetType: string[];
  setSelectedPetType: (selectedPetType: string[]) => void;
};

const ToolBar = ({
  ownerNameSearchValue,
  petNameSearchValue,
  selectedPetType,
  setOwnerNameSearchValue,
  setPetNameSearchValue,
  setSelectedPetType,
}: props) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === "string") {
      setSelectedPetType([value]);
    } else {
      setSelectedPetType(value);
    }
  };
  return (
    <div className="flex flex-col space-y-1 md:flex-row md:items-end md:space-x-2">
      <div className="p-1 md:w-1/3">
        <TextField
          variant="standard"
          fullWidth
          value={ownerNameSearchValue}
          label="Search By Owner Name"
          aria-label="Search By Owner Name"
          onChange={({ target }) => setOwnerNameSearchValue(target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setOwnerNameSearchValue("")}>
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="p-1 md:w-1/3">
        <TextField
          variant="standard"
          fullWidth
          value={petNameSearchValue}
          label="Search By Pet Name"
          aria-label="Search By Pet Name"
          onChange={({ target }) => setPetNameSearchValue(target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setPetNameSearchValue("")}>
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="p-1 md:w-1/3">
        <FormControl fullWidth>
          <InputLabel variant="standard">Filter By Pet Type</InputLabel>
          <Select
            multiple
            value={selectedPetType}
            onChange={handleChange}
            variant="standard"
            renderValue={(selected) => selected.join(", ")}
            aria-label="Filter By Pet Type"
          >
            {Object.values(petType).map((type) => (
              <MenuItem key={type} value={type} disableGutters>
                <Checkbox
                  checked={selectedPetType.indexOf(type) > -1}
                  size="small"
                />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ToolBar;
