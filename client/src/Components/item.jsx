import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <div>
      {props.displayData === "partDetailed" && (
        <div className="listItem">
          <Link to={`/items/${props.itemData.id}`}>
            <img src={props.itemData.image} className="img-fluid " alt="" />
          </Link>{" "}
          <p>{props.itemData.title}</p>
        </div>
      )}

      {props.displayData === "fullItemDetails" && (
        <div className="singleItem">
          <img src={props.itemData.image} alt="" />
          <div>
            <p> {props.itemData.description}</p>

            <p>
              <strong>Price:</strong> {props.itemData.price}$
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
