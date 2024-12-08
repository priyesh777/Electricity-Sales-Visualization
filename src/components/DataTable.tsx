import React, { useMemo, useState } from "react";
import { SaleData } from "./Api";
import { TablePagination, TableStyles } from "../styles/DataTable.styles";

interface DataTableProps {
    data: SaleData[];
}

interface ColumnConfig<T> {
    Header: string;
    accessor: keyof T;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const pageSize = 6;

    // Define columns with proper typing
    const columns: ColumnConfig<SaleData>[] = useMemo(
        () => [
            { Header: "Year", accessor: "period" },
            { Header: "State", accessor: "stateDescription" },
            { Header: "Sector", accessor: "sectorName" },
            { Header: "Sales", accessor: "sales" },
        ],
        []
    );

    // Pagination logic
    const pageCount = Math.ceil(data.length / pageSize);
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedRows = data.slice(startIndex, endIndex);

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    const renderPageNumbers = () => {
        const pageNumbers = Array.from({ length: pageCount }, (_, index) => index);
        return pageNumbers.map((pageIndex) => (
            <button
                key={pageIndex}
                disabled={currentPage === pageIndex}
                onClick={() => handlePageChange(pageIndex)}
            >
                {pageIndex + 1}
            </button>
        ));
    };

    return (
        <TableStyles>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor as string}>{column.Header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayedRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.accessor as string}>
                                    {row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination>
                <button
                    disabled={currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {renderPageNumbers()}
                <button
                    disabled={currentPage === pageCount - 1}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </TablePagination>
        </TableStyles>
    );
};

export default DataTable;
