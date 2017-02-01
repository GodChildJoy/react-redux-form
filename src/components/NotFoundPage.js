import React from 'react';
import {Link} from 'react-router';

const NotFountPage = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Whoops! Sorry, there is nothing to see here.</p>
      <p><Link to="HomePage">Back to Home</Link></p>
    </div>
  );
};

export default NotFountPage;
