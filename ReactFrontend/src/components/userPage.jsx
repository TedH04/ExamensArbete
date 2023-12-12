import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { JobContext } from '../contexts/JobContext';
import './styling/userPage.css';

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
              {/* Render job requests here */}
              {Array.isArray(jobRequests) && jobRequests.map((request, index) => (
                <div key={index} className="job-request">
                  <h3>{request.jobTitle}</h3>
                  <p>{request.jobDescription}</p>
                  {/* Additional job request details here */}
                </div>
              ))}
            </section>
          )}
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
};
