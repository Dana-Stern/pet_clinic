import { Patient, PatientFromDB } from "@/lib/interfaces";
import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import PatientModal from "./patient-modal";
import { getPatientBirthDateFormatted } from "@/lib/dates-utils";

type props = {
  patient: PatientFromDB;
};

const EditPatient = ({ patient }: props) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const EDIT_PATIENT_INITIAL_VALUES = {
    id: patient._id,
    ownerName: patient.ownerName,
    phone: patient.phone,
    petName: patient.petName,
    petBirthDate: getPatientBirthDateFormatted(patient.petBirthDate),
    type: patient.type,
  };

  const { mutate: editPatientMutate, isLoading } = useMutation(
    (newPatient: PatientFromDB) => axios.put("/api/patients", newPatient),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("read");
        handleCloseDialog();
      },
    },
  );

  const editPatient = ({
    petBirthDate,
    ownerName,
    phone,
    type,
    petName,
  }: Patient) => {
    editPatientMutate({
      _id: patient._id,
      ownerName,
      petBirthDate,
      phone,
      type,
      petName,
    });
  };

  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>
      {isDialogOpen && (
        <PatientModal
          isDialogOpen={isDialogOpen}
          closeDialog={handleCloseDialog}
          formInitialValues={EDIT_PATIENT_INITIAL_VALUES}
          formHandleSubmit={editPatient}
          patientID={patient._id}
          isMutationLoading={isLoading}
        />
      )}
    </>
  );
};

export default EditPatient;
