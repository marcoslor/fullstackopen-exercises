import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { type Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Container>
              <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                Patientor
              </Typography>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Home
              </Button>
              <Divider hidden />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PatientListPage
                      patients={patients}
                      setPatients={setPatients}
                    />
                  }
                />
                <Route path="/patients/:id" element={<PatientInfoPage />} />
              </Routes>
            </Container>
          </Router>
        </QueryClientProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
