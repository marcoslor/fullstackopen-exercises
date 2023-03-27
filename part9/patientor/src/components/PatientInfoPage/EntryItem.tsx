import { Paper, ListItem, Typography, Divider } from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import BusinessIcon from "@mui/icons-material/Business";

import {
  assertNever,
  type OccupationalHealthcareEntry,
  type Entry,
  type HospitalEntry,
  type HealthCheckEntry,
  HealthCheckRating,
} from "../../types";
import DiagnosesList from "./DiagnosesList";

const PatientRating = ({ rating }: { rating: number }) => {
  const starNumber = 4 - rating;

  return (
    <i aria-label="Rating in stars" title={HealthCheckRating[rating]}>
      {Array.from({ length: starNumber }).map((_, i) => (
        <StarIcon key={i} sx={{ color: "#FFD700" }} />
      ))}
      {Array.from({ length: rating }).map((_, i) => (
        <StarBorder key={i} />
      ))}
    </i>
  );
};

const BaseEntryItem = ({
  entry,
  children,
}: {
  entry: Entry;
  children: React.ReactNode;
}) => {
  return (
    <ListItem key={entry.id} sx={{ display: "block" }}>
      <Paper sx={{ padding: "1rem" }}>
        {children}
        <div className="my-4">
          <Divider />
        </div>
        <Typography variant="body1">
          <CalendarMonthIcon /> {entry.date}
        </Typography>
        <Typography variant="body1">
          <PersonIcon /> Specialist: {entry.specialist}
        </Typography>
        <div className="my-4">
          <Divider />
        </div>
        <Typography variant="body1">
          <AssignmentLateIcon /> Description
        </Typography>
        <Typography variant="body2" mb={2} pl={5}>
          {entry.description}
        </Typography>
        <Typography variant="body1">
          <AssignmentIcon /> Diagnoses
        </Typography>
        <DiagnosesList diagnoses={entry.diagnosisCodes} />
      </Paper>
    </ListItem>
  );
};

const HospitalEntryItem = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <BaseEntryItem entry={entry}>
      <Typography variant="body1" mb={1}>
        <AssignmentIcon /> Hospital
      </Typography>
      <Typography variant="body1">Discharge:</Typography>
      <Typography variant="body2" ml={2}>
        {entry.discharge.date} - {entry.discharge.criteria}
      </Typography>
    </BaseEntryItem>
  );
};

const OccupationalEntryItem = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <BaseEntryItem entry={entry}>
      <Typography variant="body1">
        <AssignmentIcon /> Occupational
      </Typography>
      <Typography variant="body1">
        <BusinessIcon></BusinessIcon> Employer
      </Typography>
      <Typography variant="body2" ml={5}>
        {entry.employerName}
      </Typography>
      {entry.sickLeave !== undefined && (
        <>
          <Typography variant="body1">
            <AssignmentIcon /> Sick Leave
          </Typography>
          <Typography variant="body2" ml={5}>
            {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        </>
      )}
    </BaseEntryItem>
  );
};

const HealthCheckEntryItem = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <BaseEntryItem entry={entry}>
      <Typography variant="body1" mb={1}>
        <AssignmentIcon /> Health Check
      </Typography>
      <Typography variant="body1">
        Rating: <PatientRating rating={entry.healthCheckRating} />{" "}
      </Typography>
    </BaseEntryItem>
  );
};

const EntryItem = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryItem entry={entry} key={entry.id} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryItem entry={entry} key={entry.id} />;
    case "HealthCheck":
      return <HealthCheckEntryItem entry={entry} key={entry.id} />;
    default:
      return assertNever(entry);
  }
};

export default EntryItem;
