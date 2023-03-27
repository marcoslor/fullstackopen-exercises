import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type Diagnosis } from "../../../types";
import patientService from "../../../services/patients";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function MultipleSelectChip() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const diagnosesQuery = useQuery<Diagnosis[]>(
    ["diagnoses"],
    patientService.getDiagnoses
  );

  if (diagnosesQuery.isLoading) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    if (typeof value === "string") {
      setSelectedValues(value.split(","));
      return;
    }

    setSelectedValues(value);
  };

  const options = diagnosesQuery.data?.map((d) => d.code) ?? [];

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="diagnosis-select-label">Diagoses</InputLabel>
        <Select
          labelId="diagnosis-select-label"
          id="diagnosis-select"
          multiple
          label="Diagoses"
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput name="diagnosis-select-input" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelectChip;
