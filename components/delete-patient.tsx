import { Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import LoadingAnimation from "./loading-animation";

type props = {
  patientID: string;
  closeDialog: () => void;
};

const DeletePatient = ({ patientID, closeDialog }: props) => {
  const queryClient = useQueryClient();

  const { mutate: deletePatient, isLoading } = useMutation(
    (patientID: string) =>
      axios.delete("/api/patients", { data: { patientID: patientID } }),
    {
      onSuccess: () => {
        closeDialog();
        queryClient.invalidateQueries("read");
      },
    },
  );

  return (
    <>
      {isLoading ? (
        <div className="my-1">
          <LoadingAnimation size="sm" />
        </div>
      ) : (
        <IconButton
          onClick={() => deletePatient(patientID)}
          disabled={isLoading}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};

export default DeletePatient;
