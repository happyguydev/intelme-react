import React, { useState } from 'react';
import './style.css';
import { Link, Redirect } from 'react-router-dom';

const PageNotFound = () => {
  const [redirect, setRedirect] = useState();

  const redirectUser = () => {
    setRedirect({
      pathname: '/dashboard',
    });
  };

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="Container404">
        <div className="imgContainer" />
        <div className="textContainer">
          <h2>404 Something went wrong...</h2>
          <h4>
            We couldn’t find the page you are looking for. Please contact the
            site administrator.
          </h4>
          <button onClick={() => redirectUser()} className="goBackBtn">
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
