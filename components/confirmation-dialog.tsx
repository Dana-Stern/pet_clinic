import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Button from "./button";

type props = {
  isDialogOpen: boolean;
  discardChanges: () => void;
  closeConfirmationDialog: () => void;
};

const ConfirmationDialog = ({
  isDialogOpen,
  discardChanges,
  closeConfirmationDialog,
}: props) => {
  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Are you sure you want to discard your changes?</DialogTitle>
      <DialogActions>
        <Button
          onClick={closeConfirmationDialog}
          variant="outlined"
          title="Cancel"
        />
        <Button onClick={discardChanges} title="Discard" />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
