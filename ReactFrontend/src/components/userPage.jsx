import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { JobContext } from '../contexts/JobContext';
import './styling/userPage.css';

const JobRequestItem = ({ request }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="job-request-item">
      <div className="job-request-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{request.jobTitle}</h3>
      </div>
      {isOpen && (
          <div className="job-request-details">
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
  );
};

export const UserPage = () => {
  const { currentUser } = useContext(UserContext);
  const { jobRequests, refreshJobRequests } = useContext(JobContext);
  const [isAdminOrEmployee, setIsAdminOrEmployee] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.userrole) {
      const roles = currentUser.userrole; // assuming roles is an array
      setIsAdminOrEmployee(roles.includes('Admin') || roles.includes('Employee'));
      refreshJobRequests();
    }
  }, [currentUser, refreshJobRequests]);

  return (
    <div className="user-page-container">
      {currentUser ? (
        <>
          <h1>Welcome, {currentUser.name}</h1>
          <p>Email: {currentUser.email}</p>
          <p>User Role: {currentUser.userrole}</p>
          {/* Additional user info here */}
          {isAdminOrEmployee && (
            <section className="job-requests">
              <h2>Job Requests</h2>
              <div className="job-requests-list">
                {Array.isArray(jobRequests) && jobRequests.map((request, index) => (
                  <JobRequestItem key={index} request={request} />
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