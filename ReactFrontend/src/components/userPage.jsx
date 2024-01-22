import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { JobContext } from '../contexts/JobContext';
import { FaTrash } from 'react-icons/fa';
import ConfirmWindow from './partials/confirmWindow';
import './styling/userPage.css';

const JobRequestItem = ({ request, deleteJobRequest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteJobRequest(request.id);
    setIsConfirmOpen(false);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
    <div className="job-request-item">
      <div className="job-request-header" onClick={() => setIsOpen(!isOpen)}>
        <FaTrash className="delete-icon" onClick={handleDelete} />
        <h3>{request.jobTitle}</h3>
      </div>
      {isOpen && (
        <div className="job-request-details">
          <div className='jobCustomer'>Kund namn: {request.customerName} <br /> Nummer: {request.customerPhoneNumber}</div>
          <div className='jobDescription'>{request.jobDescription}</div>
          <div className='jobAddress'>Address: {request.jobAddress}</div>
          <div className='jobCity'>City: {request.jobCity}</div>
          <div className='jobZip'>Postal Code: {request.jobZip}</div>
          <div className='jobEmail'>Email: {request.contactEmail}</div>
          {request.isCompany && (
            <>
              <div className="companyDetails">Company Name: {request.companyName}</div>
              <div className="companyDetails">Organization Number: {request.orgNumber}</div>
            </>
          )}
        </div>
      )}
    </div>
    <ConfirmWindow
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        message="Är du säker på att du vill ta bort denna förfrågan?"
      />
    </>
  );
};

export const UserPage = () => {
  const { currentUser } = useContext(UserContext);
  const { jobRequests, refreshJobRequests, deleteJobRequest } = useContext(JobContext);
  const [isAdminOrEmployee, setIsAdminOrEmployee] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role) {
      const roles = currentUser.role; 
      setIsAdminOrEmployee(roles.includes('Admin') || roles.includes('Employee'));
      refreshJobRequests();
    }
    else{
      currentUser.role = "Vanligt"
    }
  }, [currentUser, refreshJobRequests]);

  return (
    <div id='userpage' className="user-page-container">
      {currentUser ? (
        <>
          <h1>Welcome, {currentUser.name}</h1>
          <p>Email: {currentUser.email}</p>
          <p>Konto typ: {currentUser.role}</p>
          {}
          {isAdminOrEmployee && (
            <section className="job-requests">
              <h2>Job Requests</h2>
              <div className="job-requests-list">
                {Array.isArray(jobRequests) && jobRequests.map((request, index) => (
                  <JobRequestItem key={index} request={request} deleteJobRequest={deleteJobRequest} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
};