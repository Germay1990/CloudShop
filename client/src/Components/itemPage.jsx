import { useParams } from "react-router-dom";
import Item from "./item";
import { Link } from "react-router-dom";
import { addToCartAction } from "../actions";
import store from "../store";

export default function ItemPage(props) {
  let { id } = useParams();
  let { allItems } = props;
  let chosenItem = allItems.find((item) => item.id === Number(id));
  return (
    <div>
      {chosenItem && (
        <div>
          <Item itemData={chosenItem} displayData={"fullItemDetails"} />
          <Link to={"/cart"}>
            <button
              className="btn btn-success"
              onClick={() => {
                store.dispatch(addToCartAction(chosenItem));
                alert("Item added successfully !");
              }}
            >
              Add to Cart
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
