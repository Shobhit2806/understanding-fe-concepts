import React, { useMemo } from "react";
import { useTable, UseTableOptions } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";

// Use your own types for the data items
type DataItem = {
  name: string;
  age: number;
  phoneNumber: string;
};

type ColumnType<DataItem> = {
  Header: string;
  accessor: keyof DataItem;  // "keyof DataItem" restricts to keys of DataItem type
  Footer: string,
  sticky:string,
  disableFilters?:boolean,
  Cell?: React.ReactNode // Define Cell as an optional property that can hold a React node
};

export const BasicTable = () => {
  const columns: ColumnType<DataItem>[] = useMemo(() => COLUMNS, []);
  const data: DataItem[] = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable<DataItem>({
    columns,
    data,
  } as UseTableOptions<DataItem>);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};
