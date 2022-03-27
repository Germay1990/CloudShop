import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import store from "../store";
import { removeFromCartAction } from "../actions";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, forwardRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Cart(props) {
  let [currentItem, setCurrentItem] = useState({});
  const [open, setOpen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: "",
    text: "",
  });

  const handleAddProductClick = () => {
    setOpenSnackbar({
      open: true,
      severity: "success",
      text: "Item added successfully",
    });
  };

  const handleRemoveProductClick = () => {
    setOpenSnackbar({
      open: true,
      severity: "warning",
      text: "Item removed successfully",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (evt) => {
    if (evt.target.innerHTML === "Delete") {
      store.dispatch(removeFromCartAction(currentItem));
    }
    setOpen(false);
  };

  return (
    <div className="container">
      <div className="title">
        <h1 className="display-5">Cart Items</h1>
      </div>

      {store.getState().length === 0 && <p> Cart Is Empty </p>}

      {store.getState().length > 0 &&
        store.getState().map((item) => (
          <div key={item.id}>
            <div className="itemInCart">
              <img src={item.image} alt="" />
              <div className="desc">
                <p>{item.description}</p>
              </div>
              <div className="price">
                <p>
                  <strong>Price:</strong> {item.price * item.qty}$
                </p>
              </div>
              <div className="quantity">
                <p>
                  <strong>quantity:</strong> {item.qty}
                </p>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      if (item.qty === 1) {
                        item.qty = 1;
                      } else {
                        item.qty -= 1;
                        handleRemoveProductClick();
                      }
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    onClick={() => {
                      item.qty += 1;
                      handleAddProductClick();
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>

                <div>
                  <button
                    className="btn btn-danger"
                    onClick={(evt) => {
                      setCurrentItem(item);
                      handleClickOpen(evt);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar.open}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          open={openSnackbar.open}
          severity={openSnackbar.severity}
          sx={{ width: "100%" }}
        >
          {openSnackbar.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
