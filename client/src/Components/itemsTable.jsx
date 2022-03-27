import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "_title", headerName: "Title", width: 350 },
  { field: "_price", headerName: "Price", width: 150 },
];

export default function ItemsTable(props) {
  let rows = [];
  let { allItems } = props;

  allItems.map((item) => {
    rows.push({
      id: item.id,
      _id: item.id,
      _title: item.title,
      _price: item.price,
    });
  });

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
