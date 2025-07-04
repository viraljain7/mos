import React from "react";
import { Link } from "react-router-dom";

const RecentTxn = () => {
  const indianCustomers = [
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@gmail.com",
      avatar: "assets/images/user-grid/indian-user1.png",
      orderId: "#78291",
      time: "2 min ago",
      amount: "₹8,500.00",
      status: "success",
      statusClass: "bg-success-focus text-success-main"
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@yahoo.in",
      avatar: "assets/images/user-grid/indian-user2.png",
      orderId: "#63452",
      time: "15 min ago",
      amount: "₹5,200.00",
      status: "pending",
      statusClass: "bg-lilac-100 text-lilac-600"
    },
    {
      id: 3,
      name: "Rahul Gupta",
      email: "rahul.gupta@outlook.com",
      avatar: "assets/images/user-grid/indian-user3.png",
      orderId: "#89123",
      time: "25 min ago",
      amount: "₹12,750.00",
      status: "failed",
      statusClass: "bg-warning-focus text-warning-main"
    },
    {
      id: 4,
      name: "Ananya Reddy",
      email: "ananya.reddy@hotmail.com",
      avatar: "assets/images/user-grid/indian-user4.png",
      orderId: "#45678",
      time: "38 min ago",
      amount: "₹3,450.00",
      status: "Processing",
      statusClass: "bg-info-100 text-info-600"
    },
    {
      id: 5,
      name: "Vikram Joshi",
      email: "vikram.joshi@rediffmail.com",
      avatar: "assets/images/user-grid/indian-user5.png",
      orderId: "#92345",
      time: "1 hour ago",
      amount: "₹9,800.00",
      status: "success",
      statusClass: "bg-success-focus text-success-main"
    }
  ];
  
  return (
    // <div className='col-xxl-8'>
    <div className='col-xxl-12'>  
    {/* //change 8 to 12 for dashbaord */}

      <div className='card h-100'>
        <div className='card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between'>
          <h6 className='text-lg fw-semibold mb-0'>Recent Transaction</h6>
          <Link
            to='#'
            className='text-primary-600 hover-text-primary d-flex align-items-center gap-1'
          >
            View All
            <iconify-icon
              icon='solar:alt-arrow-right-linear'
              className='icon'
            />
          </Link>
        </div>
        <div className='card-body p-0'>
          <div className='table-responsive scroll-sm'>
            <table className='table bordered-table mb-0 rounded-0 border-0'>
              <thead>
                <tr>
                  <th scope='col' className='bg-transparent rounded-0'>
                    Customer
                  </th>
                  <th scope='col' className='bg-transparent rounded-0'>
                    ID
                  </th>
                  <th scope='col' className='bg-transparent rounded-0'>
                    Retained
                  </th>
                  <th scope='col' className='bg-transparent rounded-0'>
                    Amount
                  </th>
                  <th scope='col' className='bg-transparent rounded-0'>
                    Status
                  </th>
                </tr>
              </thead>
          
<tbody>
  {indianCustomers.map(customer => (
    <tr key={customer.id}>
      <td>
        <div className='d-flex align-items-center'>
          <img
            src="assets/images/user-grid/user-grid-img5.png"
            alt={customer.name}
            className='w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden'
          />
          <div className='flex-grow-1'>
            <h6 className='text-md mb-0'>{customer.name}</h6>
            <span className='text-sm text-secondary-light fw-medium'>
              {customer.email}
            </span>
          </div>
        </div>
      </td>
      <td>{customer.orderId}</td>
      <td>{customer.time}</td>
      <td>{customer.amount}</td>
      <td>
        <span className={`${customer.statusClass} px-10 py-4 radius-8 fw-medium text-sm`}>
          {customer.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTxn;
