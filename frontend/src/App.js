import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="text-center mb-4">Bookings</h1>
          <div className="card shadow">
            <div className="card-body">
              <div className="table-responsive">
                <table {...getTableProps()} className="table table-striped table-hover">
                  <thead className="thead-dark">
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())} className="text-center">
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
                            return <td {...cell.getCellProps()} className="text-center">{cell.render('Cell')}</td>
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;