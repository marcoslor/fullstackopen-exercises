import { type Diagnosis } from "../../types";
import patientService from "../../services/patients";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const DiagnosesList = ({
  diagnoses,
}: {
  diagnoses: Array<Diagnosis["code"]> | undefined;
}) => {
  const diagnosesQuery = useQuery<Diagnosis[]>(
    ["diagnoses"],
    patientService.getDiagnoses
  );

  if (diagnosesQuery.isLoading) {
    return <Typography variant="body2">Loading diagnoses...</Typography>;
  }

  if (diagnosesQuery.data === undefined) {
    return <></>;
  }

  const diagnosesDefinitions = diagnosesQuery.data;

  return (
    <ul className="pl-7">
      {Array.isArray(diagnoses) && diagnoses.length > 0 ? (
        diagnoses.map((code) => {
          const diagnosis = diagnosesDefinitions.find((d) => d.code === code);
          if (diagnosis === undefined) {
            return null;
          }
          return (
            <li key={code}>
              <Typography variant="body2">
                - {diagnosis.code} | {diagnosis.name}
              </Typography>
            </li>
          );
        })
      ) : (
        <li>
          <Typography variant="body2">- No diagnoses </Typography>
        </li>
      )}
    </ul>
  );
};

export default DiagnosesList;
