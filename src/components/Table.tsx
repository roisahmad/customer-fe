/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { JSX } from "react";
import { useTable, useSortBy, Column } from "react-table";

export interface TableData {
  [key: string]: any;
}

export interface PaginationInfo {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalItems: number;
}

export interface SortingInfo {
  id: string;
  desc: boolean;
}

export interface TableProps<T extends object> {
  title: string;
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  pagination: PaginationInfo;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  pageSizeOptions?: number[];
}

export default function Table<T extends object>({
  title,
  columns,
  data,
  loading,
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
}: TableProps<T>): JSX.Element {
  const { pageIndex, pageSize, pageCount, totalItems } = pagination;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        manualPagination: true,
        pageCount,
        initialState: { pageIndex, pageSize },
      },
      useSortBy
    );

  const firstItemIndex = pageIndex * pageSize + 1;
  const lastItemIndex = Math.min((pageIndex + 1) * pageSize, totalItems);

  return (
    <div className="overflow-x-auto w-full rounded-3xl shadow-lg bg-white">
      <div className="font-bold text-2xl px-4 mt-4">{title}</div>
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="text-sm text-gray-600">
          {totalItems > 0 ? (
            <>
              Menampilkan {firstItemIndex} - {lastItemIndex} dari {totalItems}{" "}
              item
            </>
          ) : (
            <>Tidak ada data</>
          )}
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700">Tampilkan:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table {...getTableProps()} className="min-w-full bg-white">
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup: any, index: number) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column: any, idx: number) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-800 cursor-pointer select-none hover:bg-gray-100"
                  key={idx}
                >
                  <div className="flex items-center">
                    {column.render("Header")}
                    <span className="ml-1 text-xs">
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                Memuat data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                Tidak ada data yang tersedia
              </td>
            </tr>
          ) : (
            <>
              {rows.map((row, index: number) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.cells.map((cell, idx: number) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 text-sm text-gray-700"
                        key={idx}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>

      {pageCount > 0 && (
        <div className="flex justify-between items-center mt-4 p-4">
          <button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            className={`px-4 py-2 text-sm rounded-full ${
              pageIndex === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Sebelumnya
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
              let pageToShow;
              if (pageCount <= 5) {
                pageToShow = i;
              } else if (pageIndex < 3) {
                pageToShow = i;
              } else if (pageIndex > pageCount - 3) {
                pageToShow = pageCount - 5 + i;
              } else {
                pageToShow = pageIndex - 2 + i;
              }

              return (
                <button
                  key={pageToShow}
                  onClick={() => onPageChange(pageToShow)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    pageIndex === pageToShow
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {pageToShow + 1}
                </button>
              );
            })}

            {pageCount > 5 && pageIndex < pageCount - 3 && (
              <>
                <span className="mx-1 text-gray-500">...</span>
                <button
                  onClick={() => onPageChange(pageCount - 1)}
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                >
                  {pageCount}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
            className={`px-4 py-2 text-sm rounded-full ${
              pageIndex >= pageCount - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
