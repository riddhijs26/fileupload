import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CustodianContext } from "../CustodianContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const SubmitDialog = ({
  open,
  handleClose,
  NumberofFile,
  CustodianSubmited,
}) => {
  const [custodian, setCustodians] = useContext(CustodianContext);
  const textRef = useRef();
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(custodian);
    console.log(textRef);
  }, [custodian]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const submitCustodian = () => {
    setCustodians({
      Name: textRef.current.value,
      NumberofFile: NumberofFile,
      isloading: true,
    });
    CustodianSubmited();

    axios
      .post(`${process.env.API_Url}/fileupload`, {
        data: {
          Name: textRef.current.value,
          NumberofFile: NumberofFile,
          isloading: true,
        },
      })
      .then((res) => {
        console.log("here");
        setCustodians((prev) => {
          console.log(prev);
          return { ...prev, isloading: false };
        });
      })
      .catch((err) => {});
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      minWidth="xl"
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
    >
      <DialogTitle sx={{ backgroundColor: "#4db6ac" }}>
        Upload Files
      </DialogTitle>
      <DialogContent sx={{ m: 2, p: 3 }}>
        <DialogContentText sx={{ mb: 2 }}>
          <b>Total Uploaded filed : {NumberofFile}</b>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name of the folder"
          type="text"
          variant="standard"
          inputRef={textRef}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={!name} onClick={submitCustodian}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitDialog;
