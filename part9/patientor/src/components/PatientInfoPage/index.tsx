import { useState } from "react";

import { List, ListItem, Typography, Button, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import patientService from "../../services/patients";

import AddEntryModal from "./AddEntryModal";
import EntryItem from "./EntryItem";

const PatientInfoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [successNotifications, setSuccessNotifications] = useState<string[]>(
    []
  );

  const { id = "" } = useParams<{ id: string }>();

  const patientQuery = useQuery(
    ["patient", id],
    async () => await patientService.getPatient(id),
    { enabled: id !== "" }
  );

  if (patientQuery.data === undefined) {
    return <div>Loading...</div>;
  }

  const onSuccess = (message: string) => {
    setSuccessNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setSuccessNotifications((prev) => prev.filter((m) => m !== message));
    }, 5000);
  };

  return (
    <div>
      <AddEntryModal
        modalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSuccess={onSuccess}
      />
      <Typography align="left" variant="h5">
        {patientQuery.data.name}
      </Typography>

      <List>
        <ListItem>
          <Typography variant="body1" mr={1}>
            SSN:
          </Typography>
          {patientQuery.data.ssn}
        </ListItem>
        <ListItem>
          <Typography variant="body1" mr={1}>
            Occupation:
          </Typography>
          {patientQuery.data.occupation}
        </ListItem>
        <ListItem sx={{ display: "block" }}>
          <div className="flex flex-row justify-between mb-4 items-center">
            <Typography variant="body1" mr={1}>
              Entries:
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              Add entry
            </Button>
          </div>
          {successNotifications.map((message) => (
            <Alert severity="success" key={message}>
              {message}
            </Alert>
          ))}
          <List sx={{ display: "block" }}>
            {patientQuery.data.entries?.map((entry) => (
              <EntryItem entry={entry} key={entry.id} />
            ))}
          </List>
        </ListItem>
      </List>
    </div>
  );
};

export default PatientInfoPage;
