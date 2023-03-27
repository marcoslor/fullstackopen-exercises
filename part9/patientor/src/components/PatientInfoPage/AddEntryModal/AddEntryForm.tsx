import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { assertNever, type EntryType, HealthCheckRating } from "../../../types";
import MultipleSelectChip from "./DiagnosisSelect";
import DatePicker from "./DatePicker";

const BaseEntryFormFields = () => (
  <>
    <DatePicker
      label="Date of consult"
      name="consult-date"
      sx={{
        width: "100%",
      }}
    />
    <TextField label="Specialist" name="specialist" fullWidth />
    <TextField
      label="Description"
      multiline
      rows={4}
      name="description"
      fullWidth
    />
    <MultipleSelectChip />
  </>
);

const HospitalEntryFormFields = () => (
  <>
    <DatePicker
      label="Sick leave start date"
      name="hospital-discharge-date"
      sx={{
        width: "100%",
      }}
    />
    <TextField label="Criteria" fullWidth name="hospital-discharge-criteria" />
  </>
);

const OccupationalHealthcareEntryFormFields = () => (
  <>
    <TextField
      label="Employer name"
      fullWidth
      name="occupational-employer-name"
    />
    <Grid container columnSpacing={1}>
      <Grid item xs={6}>
        <DatePicker
          label="Sick leave start date"
          name="occupational-sick-leave-start-date"
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <DatePicker
          sx={{
            width: "100%",
          }}
          label="Sick leave end date"
          name="occupational-sick-leave-end-date"
        />
      </Grid>
    </Grid>
  </>
);

const healthCheckRatingOptions = Object.entries(HealthCheckRating).filter(
  ([key, _]) => Number.isNaN(Number(key))
);

const HealthCheckEntryFormFields = () => (
  <>
    <FormControl fullWidth>
      <InputLabel id="health-check-rating-label">Health Rating</InputLabel>
      <Select
        label="Rating"
        labelId="health-check-rating-label"
        id="health-check-rating"
        defaultValue={HealthCheckRating.Healthy}
        name="health-check-rating"
      >
        {healthCheckRatingOptions.map(([key, value]) => (
          <MenuItem key={value} value={value}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </>
);

const EntryFormFields = ({ type }: { type: EntryType }) => {
  switch (type) {
    case "Hospital":
      return <HospitalEntryFormFields />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryFormFields />;
    case "HealthCheck":
      return <HealthCheckEntryFormFields />;
    default:
      assertNever(type);
  }
};

const AddEntryForm = ({ type }: { type: EntryType }) => (
  <>
    <div className="space-y-2 ">
      <EntryFormFields type={type} />
    </div>
    <div className="space-y-2">
      <BaseEntryFormFields />
    </div>
  </>
);

export default AddEntryForm;
