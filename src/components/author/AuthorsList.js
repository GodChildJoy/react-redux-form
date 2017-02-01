import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const AuthorsList = ({authors}) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Author Id</th>
            <th>First Name</th>
            <th>Second Name</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) =>
            <tr key={author.id}>
              <td><Link to={`/author/${author.id}`}>{author.id}</Link></td>
              <td>{author.firstName}</td>
              <td>{author.lastName}</td>
            </tr>
           )}
        </tbody>
      </table>
    );
};

AuthorsList.propTypes = {
  authors: React.PropTypes.array.isRequired
};

export default AuthorsList;
