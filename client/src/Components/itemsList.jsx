import { useState } from "react";
import Item from "./item";
import { ProgressBar } from "react-bootstrap";

export default function ItemsList(props) {
  let [error] = useState(null);

  let { allItems } = props;

  return (
    <div className="container items-container">
      <div className="title">
      <h2 className="display-6">{props.title}</h2>
      </div>
      <div className="row">
        {error && <div>{error}</div>}
        {allItems.length === 0 && (
          <div className="progressBar">
            <p>
              Loading...
            </p>
            <ProgressBar animated now={100} />
          </div>
        )}

        {allItems &&
          allItems.map((item) => {
            return (
              <div key={item.id} className="col-4 item">
                <Item itemData={item} displayData={"partDetailed"} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
