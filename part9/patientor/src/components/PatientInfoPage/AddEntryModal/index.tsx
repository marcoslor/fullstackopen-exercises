import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  DialogActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  FormControl,
} from "@mui/material";

import {
  type EntryType,
  type PatientEntryFormValues,
  type HospitalEntry,
  type OccupationalHealthcareEntry,
  type HealthCheckEntry,
  type Patient,
} from "../../../types";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import AddEntryForm from "./AddEntryForm";
import patientService from "../../../services/patients";
import { formModelNameMapping } from "./helpers";

const entryTypes = {
  Hospital: "Hospital",
  OccupationalHealthcare: "Occupational Healthcare",
  HealthCheck: "Health Check",
} as const;

const getSubmitValues = (
  formValues: Record<string, string>
): PatientEntryFormValues => {
  const formEntryType = formValues["entry-type"];

  const baseEntry = {
    date: formValues["consult-date"],
    specialist: formValues.specialist,
    description: formValues.description,
    diagnosisCodes: formValues["diagnosis-select-input"]?.split(","),
  };

  switch (formEntryType) {
    case "Hospital": {
      const values: Omit<HospitalEntry, "id"> = {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: formValues["hospital-discharge-date"],
          criteria: formValues["hospital-discharge-criteria"],
        },
      };
      return values;
    }
    case "OccupationalHealthcare": {
      const values: Omit<OccupationalHealthcareEntry, "id"> = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: formValues["occupational-employer-name"],
        sickLeave: {
          startDate: formValues["occupational-sick-leave-start-date"],
          endDate: formValues["occupational-sick-leave-end-date"],
        },
      };
      return values;
    }
    case "HealthCheck": {
      const values: Omit<HealthCheckEntry, "id"> = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: Number(formValues["health-check-rating"]),
      };
      return values;
    }
    default: {
      throw new Error(`Unknown entry type: ${formEntryType}`);
    }
  }
};

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSuccess }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("Hospital");
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<string[] | null>(null);

  const { id = "" } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const addEntryMutation = useMutation(
    async (values: PatientEntryFormValues) =>
      await patientService.addEntry(id, values),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Patient>(
          ["patient", id],
          (oldPatient: Patient | undefined): Patient | undefined => {
            if (oldPatient === undefined) {
              return undefined;
            }
            if (oldPatient.entries === undefined) {
              return { ...oldPatient, entries: [data] };
            }
            return { ...oldPatient, entries: [...oldPatient.entries, data] };
          }
        );
      },
    }
  );

  const onEntryFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formRef.current == null) {
      return;
    }

    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const submitValues = getSubmitValues(formValues);

    addEntryMutation
      .mutateAsync(submitValues)
      .then(() => {
        onSuccess("Entry added successfully");
        onClose();
      })
      .catch((error) => {
        const errors = error.response.data.map((e: any) => {
          const fieldName = e?.path[0];
          const fieldLabel = formModelNameMapping[fieldName]?.label;
          const message = e.message;

          if (fieldLabel === undefined && typeof message === "string") {
            return message;
          }

          if (typeof message === "string" && typeof fieldLabel === "string") {
            return `${fieldLabel}: ${message}`;
          }

          return "Unknown error";
        });
        setErrors(errors);
      });
  };

  const onEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
    setEntryType(event.target.value as EntryType);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <form onSubmit={onEntryFormSubmit} id="add-new-entry-form" ref={formRef}>
        <DialogTitle>Add a new patient entry</DialogTitle>
        <Divider />
        <DialogContent className={"space-y-5"}>
          {errors?.map((error) => (
            <Alert severity="error" key={error}>
              {error}
            </Alert>
          ))}
          <FormControl fullWidth>
            <InputLabel id="entry-type-label">Entry Type</InputLabel>
            <Select
              label="Entry Type"
              labelId="entry-type-label"
              id="entry-type"
              name="entry-type"
              value={entryType}
              onChange={onEntryTypeChange}
            >
              {Object.entries(entryTypes).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <AddEntryForm type={entryType} />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEntryModal;
