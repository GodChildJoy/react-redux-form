import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const CoursesList = ({courses, deleteSelectCourse}) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>length</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course)=>
            <tr key={course.id}>
              <td><input className="btn"
                     value="delete"
                     type="button"
                     onClick={deleteSelectCourse.bind(this, course.id)} /></td>
              <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
              <td>{course.authorId}</td>
              <td>{course.category}</td>
              <td>{course.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
};

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteSelectCourse: PropTypes.func.isRequired
};

export default CoursesList;
