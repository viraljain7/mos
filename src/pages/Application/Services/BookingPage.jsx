import React from "react";
import Booking from "../../../components/Application/Services/BookingLayer";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";

function BookingPage() {
  return (
    <MasterLayout>
      {/* Breadcrumb */}
      <Breadcrumb title="Booking" />

      {/* Booking */}
      <Booking />
    </MasterLayout>
  );
}

export default BookingPage;
