import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';

function App() {
  const [bookings, setBookings] = useState([]);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('http://localhost:8000/api/bookings/?sort_by=${sortBy}');
      setBookings(response.data);
    };
    fetchBookings();
  }, [sortBy]);

  const columns = useMemo(
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
    <div>
      <h1>Bookings</h1>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Default (Flat ID, Booking Checkin)</option>
        <option value="checkin">Booking Checkin</option>
      </select>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;