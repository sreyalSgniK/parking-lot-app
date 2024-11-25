import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import DashboardUser from "./components/DashboardUser";
import DashboardOwner from "./components/DashboardOwner";
import DashboardAdmin from "./components/DashboardAdmin";
import ParkingLotInformationForm from "./components/ParkingLotInformationForm";
import Profile from "./components/Profile";
import CreateParkingLot from "./components/CreateParkingLot";
import ParkingLotInformationOwnerForm from "./components/ParkingLotInformationOwnerForm";
import UpdateParkingLot from "./components/UpdateParkingLot";
import CreateBookingForm from "./components/CreateBookingForm";
import MyBookings from "./components/MyBookings";
import ManageBookings from "./components/ManageBookings";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* TODO: rewrite the protected route */}
        <Route
          path="/dashboard/user"
          element={
            <DashboardUser />
            // <ProtectedRoute>
            //   <DashboardUser />
            // </ProtectedRoute>
          }
        />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route
          path="/parking-lot/:id"
          element={<ParkingLotInformationForm />}
        />
        <Route path="/parking-lot/:id/book" element={<CreateBookingForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/dashboard/owner"
          element={
            <DashboardOwner />
            // <ProtectedRoute>
            //   <DashboardOwner />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/owner/parking-lot/:id"
          element={<ParkingLotInformationOwnerForm />}
        />
        <Route path="/parking-lot/:id/update" element={<UpdateParkingLot />} />
        <Route path="/parking-lot/:id/bookings" element={<ManageBookings />} />
        {/* <Routes>
          <Route
            path="/parking-lot/:id/update"
            element={<UpdateParkingLot />}
          />
          <Route path="/parking-lot/:id/reviews" element={<ManageReviews />} />
          <Route
            path="/parking-lot/:id/bookings"
            element={<ManageBookings />}
          />
          <Route path="/dashboard/owner" element={<DashboardOwner />} />
        </Routes> */}
        <Route path="/create-parking-lot" element={<CreateParkingLot />} />
        <Route
          path="/dashboard/admin"
          element={
            <DashboardAdmin />
            // <ProtectedRoute>
            //   <DashboardAdmin />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
