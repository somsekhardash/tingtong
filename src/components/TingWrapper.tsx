// import React from "react";

// export default function TingWrapper({ tings }) {
//   console.log(tings);
//   return (
//     <div className="ting">
//       {tings.map((ting, index) => {
//         return <div key={index}>{ting.description}</div>;
//       })}
//     </div>
//   );
// }

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "name",
    width: 150,
    editable: true,
  },
  {
    field: "amount",
    headerName: "amount",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "description",
    width: 110,
    editable: true,
  },
  {
    field: "tags",
    headerName: "tags",
    description: "This column has a value getter and is not sortable.",
    width: 110,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function TingWrapper({ tings }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tings}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
