import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import store from "../store";
import { removeFromCartAction } from "../actions";

export default function Cart(props) {
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
                      }
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    onClick={() => {
                      item.qty += 1;
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>

                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      store.dispatch(removeFromCartAction(item));
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
    </div>
  );
}
