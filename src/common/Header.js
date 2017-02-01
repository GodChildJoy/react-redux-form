import React from 'react';
import {IndexLink, Link} from 'react-router';
import LoadingDots from './loadingDots';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="about" activeClassName="active">About</Link>
      {" | "}
      <Link to="courses" activeClassName="active">Courses</Link>
      {" | "}
      <Link to="authors" activeClassName="active">Authors</Link>
      {loading && <LoadingDots interval={100} dots={20} />}
    </nav>
  );
};

Header.propTypes = {
  loading: React.PropTypes.bool.isRequired
};

export default Header;
