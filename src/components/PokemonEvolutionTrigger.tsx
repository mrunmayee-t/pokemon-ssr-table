"use client";
import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { PokemonDetails, PokemonTableProps } from "@/types/pokemon";

const columnHelper = createColumnHelper<PokemonDetails>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (typeof value === "string" && typeof filterValue === "string") {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
      return false;
    },
    enableColumnFilter: true,
  }),
  columnHelper.accessor("url", {
    header: "Details URL",
    cell: (info) => (
      <a
        href={info.getValue()}
        rel="noopener noreferrer"
        className="text-[var(--primary-url)] cursor-pointer"
      >
        View
      </a>
    ),
    footer: (info) => info.column.id,
  }),
];

const PokemonEvolutionTrigger: React.FC<PokemonTableProps> = ({
  evolutionTriggers,
}) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const data = evolutionTriggers;
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div className="p-2 w-full">
      <h1 className="text-center text-xl text-white p-2 font-bold">
        List of Evoltution Triggers
      </h1>
      <table className="w-full bg-[var(--primary-table-background)]  border-[var(--primary-text-border)] ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="text-[var(--primary-headings)] p-4 bg-[var(--primary-table-header-bg)]"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 border-1 border-[var(--primary-text-border)]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="text-center text-[var(--primary-headings)]  hover:bg-[var(--primary-active-state-hover)]"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-1 border-1 border-[var(--primary-text-border)]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1  rounded disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer  bg-[var(--primary-button)] text-white"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1  rounded disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer  bg-[var(--primary-button)] text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonEvolutionTrigger;
