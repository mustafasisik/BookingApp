import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

function App() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('http://localhost:8000/api/bookings/?sort_by=default');
      setBookings(response.data);
    };
    fetchBookings();
  }, []);

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
    <div className="min-vh-100 bg-light py-5">
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="text-center mb-5">
              <h1 className="display-4 text-primary fw-bold">Booking Management</h1>
              <p className="lead text-muted">View and manage all your bookings in one place</p>
            </div>
            <div className="card shadow-lg rounded-3 overflow-hidden">
              <div className="card-header bg-primary text-white">
                <h2 className="h4 mb-0">Bookings Overview</h2>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table {...getTableProps()} className="table table-hover mb-0">
                    <thead className="table-light">
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              className="text-center py-3"
                              style={{cursor: 'pointer'}}
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
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                              return <td {...cell.getCellProps()} className="text-center py-3">{cell.render('Cell')}</td>
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
    </div>
  );
}

export default App;
