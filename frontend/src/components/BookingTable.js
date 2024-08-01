import React from 'react';
import { useTable, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const BookingTable = ({ bookings }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Flat name', accessor: 'flat_name' },
      { Header: 'ID', accessor: 'id' },
      { Header: 'Checkin', accessor: 'checkin' },
      { Header: 'Checkout', accessor: 'checkout' },
      { Header: 'Previous booking ID', accessor: 'previous_booking_id' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: bookings }, useSortBy);

  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-hover mb-0">
        <thead className="table-light">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="text-center py-3"
                  style={{ cursor: 'pointer' }}
                >
                  {column.render('Header')}
                  <span className="ms-2">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FaSortDown />
                        : <FaSortUp />
                      : <FaSort />}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="text-center py-3">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;