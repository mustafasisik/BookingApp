import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingTable from './components/BookingTable';
import Pagination from './components/Pagination';

function App() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // You can adjust this as needed

  const fetchBookings = async (pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/bookings/?page=${pageNumber}`);
      setBookings(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
                <BookingTable bookings={bookings} />
              </div>
              <div className="card-footer">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
