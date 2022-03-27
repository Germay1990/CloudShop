import { useParams } from "react-router-dom";
import Item from "./item";
import { addToCartAction } from "../actions";
import store from "../store";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useState } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ItemPage(props) {
  let { id } = useParams();
  let { allItems } = props;
  let chosenItem = allItems.find((item) => item.id === Number(id));

  const [openSnackbar , setOpenSnackbar ] = useState(false);

  const handleAddProductClick = () => {
    setOpenSnackbar (true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      {chosenItem && (
        <div>
          <Item itemData={chosenItem} displayData={"fullItemDetails"} />
        </div>
      )}

      <div>
        <button
          className="btn btn-success"
          onClick={() => {
            store.dispatch(addToCartAction(chosenItem));
            handleAddProductClick();
          }}
        >
          Add to Cart
        </button>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackbar }
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Item added successfully
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
