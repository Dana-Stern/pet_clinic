import { Add as AddIcon } from "@mui/icons-material";
import { useState } from "react";
import PatientModal from "./patient-modal";
import { Patient } from "@/lib/interfaces";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { petType } from "@/lib/enums";
import Button from "./button";
import { getTodaysDateFormatted } from "@/lib/dates-utils";

const NEW_PATIENT_INITIAL_VALUES = {
  ownerName: "",
  phone: "",
  petName: "",
  petBirthDate: getTodaysDateFormatted(),
  type: petType.Dog,
};

const NewPatient = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: addPatient, isLoading } = useMutation(
    (newPatient: Patient) => axios.post("/api/patients", newPatient),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("read");
        closeDialog();
      },
    },
  );

  const addPatientHandleSubmit = (patient: Patient) => {
    addPatient(patient);
  };
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button
        title="Add new patient"
        onClick={openDialog}
        StartIcon={<AddIcon />}
      />
      {isDialogOpen && (
        <PatientModal
          isDialogOpen={isDialogOpen}
          closeDialog={closeDialog}
          formInitialValues={NEW_PATIENT_INITIAL_VALUES}
          formHandleSubmit={addPatientHandleSubmit}
          isMutationLoading={isLoading}
        />
      )}
    </>
  );
};

export default NewPatient;
