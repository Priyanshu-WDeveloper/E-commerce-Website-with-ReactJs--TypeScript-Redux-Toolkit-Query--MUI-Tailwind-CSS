import { Box, Button, Modal, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { generateResponsiveStyle } from "../../utils/modalStyle";

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
  name: string;
};

const WarnModal = ({ open, setOpen, handleDelete, name }: props) => {
  const style = generateResponsiveStyle();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", fontSize: "19px" }}
        >
          Are you sure you want to delete this {name}?
        </Typography>
        <div className="flexdiv">
          <Button
            className="btn btn_primary"
            onClick={() => {
              setOpen(false);
              handleDelete();
            }}
          >
            Yes
          </Button>

          <Button
            // style={{backgroundColor:"black"}}
            className="btn btn_primary"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default WarnModal;
