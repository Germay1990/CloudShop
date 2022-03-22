import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <div>
      {props.displayData === "partDetailed" && (
        <div className="listItem">
          <Link to={`/items/${props.itemData.id}`}>
            <img src={props.itemData.image} alt="" />
          </Link>{" "}
          <p>{props.itemData.title}</p>
        </div>
      )}

      {props.displayData === "fullItemDetails" && (
        <div className="singleItem">
          <div className="desc">
            <p> {props.itemData.description}</p>
          </div>
          <div className="price">
            <p>
              <strong>Price:</strong> {props.itemData.price}$
            </p>
          </div>
          <img src={props.itemData.image} alt="" />
        </div>
      )}
    </div>
  );
}
