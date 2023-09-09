import { petType } from "@/lib/enums";
import { Patient } from "@/lib/interfaces";
import { PATIENT_VALIDATION_SCHEMA } from "@/lib/validation";
import { Add, Edit } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import Button from "./button";
import { capitalize, formatPhoneNumber } from "@/lib/string-utils";
import DeletePatient from "./delete-patient";
import { useState } from "react";
import ConfirmationDialog from "./confirmation-dialog";
import LoadingAnimation from "./loading-animation";

type props = {
  isDialogOpen: boolean;
  closeDialog: () => void;
  formInitialValues: Omit<Patient, "petBirthDate"> & { petBirthDate: string };
  formHandleSubmit: (patient: Patient) => void;
  isMutationLoading: boolean;
  patientID?: string;
};

const PatientModal = ({
  isDialogOpen,
  closeDialog,
  formInitialValues,
  formHandleSubmit,
  isMutationLoading,
  patientID,
}: props) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: PATIENT_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      formHandleSubmit({
        ownerName: capitalize(values.ownerName),
        petName: capitalize(values.petName),
        phone: values.phone,
        petBirthDate: new Date(values.petBirthDate),
        type: values.type,
      });
    },
  });

  const verifyCloseDialog = () => {
    if (!formik.dirty) {
      closeDialog();
    } else {
      openConfirmationDialog();
    }
  };

  const setPhoneValue = (value: string) => {
    if (value.charAt(3) !== "-" && value.length > 3) {
      formik.setFieldValue("phone", formatPhoneNumber(value));
    } else {
      formik.setFieldValue("phone", value);
    }
  };
  const openConfirmationDialog = () => setConfirmationDialogOpen(true);
  const closeConfirmationDialog = () => setConfirmationDialogOpen(false);
  const discardChanges = () => {
    setConfirmationDialogOpen(false);
    closeDialog();
  };
  return (
    <>
      <Dialog open={isDialogOpen} onClose={verifyCloseDialog}>
        <DialogTitle className="flex justify-between space-x-2">
          <div className="flex items-center space-x-2">
            {patientID ? <Edit /> : <Add />}
            <Typography>{patientID ? "Edit" : "Add"} patient</Typography>
          </div>
          {patientID && (
            <DeletePatient patientID={patientID} closeDialog={closeDialog} />
          )}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="ownerName"
                  label="Owner Name"
                  placeholder="Israel Israeli"
                  onChange={formik.handleChange}
                  value={formik.values.ownerName}
                  error={
                    formik.touched.ownerName && Boolean(formik.errors.ownerName)
                  }
                  helperText={
                    formik.touched.ownerName && formik.errors.ownerName
                  }
                  fullWidth
                  required
                  aria-label="Owner Name"
                  aria-required="true"
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="petName"
                  label="Pet Name"
                  placeholder="Max"
                  onChange={formik.handleChange}
                  value={formik.values.petName}
                  error={
                    formik.touched.petName && Boolean(formik.errors.petName)
                  }
                  helperText={formik.touched.petName && formik.errors.petName}
                  fullWidth
                  required
                  aria-label="Pet Name"
                  aria-required="true"
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone"
                  placeholder="050-0000000"
                  onChange={(event) => setPhoneValue(event.target.value)}
                  value={formik.values.phone}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  fullWidth
                  required
                  aria-label="Phone"
                  aria-required="true"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TextField
                    name="petBirthDate"
                    label="Pet Birth Date"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.petBirthDate}
                    type="date"
                    error={
                      formik.touched.petBirthDate &&
                      Boolean(formik.errors.petBirthDate)
                    }
                    helperText={
                      formik.touched.petBirthDate && formik.errors.petBirthDate
                    }
                    fullWidth
                    required
                    aria-label="Pet Birth Date"
                    aria-required="true"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    label="Pet type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    aria-label="Pet Type"
                  >
                    {Object.values(petType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={verifyCloseDialog}
              variant="outlined"
              title="Cancel"
              disabled={isMutationLoading}
            />
            {isMutationLoading ? (
              <div className="mx-8">
                <LoadingAnimation size="sm" />
              </div>
            ) : (
              <Button title="Submit" type="submit" />
            )}
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmationDialog
        isDialogOpen={confirmationDialogOpen}
        closeConfirmationDialog={closeConfirmationDialog}
        discardChanges={discardChanges}
      />
    </>
  );
};

export default PatientModal;
