import { PatientFromDB } from "@/lib/interfaces";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import EditPatient from "./edit-patient";
import Pagination from "./pagination";
import SortButton from "./sort-button";

const columns: ColumnDef<PatientFromDB>[] = [
  { accessorKey: "ownerName", header: "Owner Name" },
  { accessorKey: "petName", header: "Pet Name" },
  { accessorKey: "phone", header: "Phone", enableSorting: false },
  { accessorKey: "age", header: "Age", enableSorting: false },
  { accessorKey: "type", header: "Type", enableSorting: false },
];

type Props = {
  patients: PatientFromDB[];
  patientsAmount: number;
};

const DataTable = ({ patients, patientsAmount }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data: patients,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  const noResults = table.getRowModel().rows.length === 0;

  return (
    <div className="overflow-x-auto">
      {patientsAmount === 0 ? (
        <div className="py-4 text-center">No patients.</div>
      ) : noResults ? (
        <div className="py-4 text-center">No matching patients found.</div>
      ) : (
        <table className="w-full border-collapse bg-white">
          <thead className="bg-violet-400 text-white">
            <tr>
              {table.getFlatHeaders().map((header) => (
                <th
                  key={header.id}
                  className={`group ${
                    header.column.getCanSort()
                      ? "cursor-pointer"
                      : "cursor-default"
                  } w-1/5 border px-2 py-2 hover:bg-violet-500 sm:px-4 sm:text-left`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getCanSort() && (
                    <SortButton
                      isSorted={header.column.getIsSorted()}
                      firstSortDir={header.column.getFirstSortDir()}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-2 py-3 sm:px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-1 py-3 sm:px-4">
                  <EditPatient patient={row.original} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="h-4" />
      <Pagination
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        goToFirstPage={() => table.setPageIndex(0)}
        goToLastPage={() => table.setPageIndex(table.getPageCount() - 1)}
        nextPage={() => table.nextPage()}
        previousPage={() => table.previousPage()}
        pageNumber={table.getState().pagination.pageIndex + 1}
        numberOfPages={table.getPageCount()}
      />
    </div>
  );
};

export default DataTable;
