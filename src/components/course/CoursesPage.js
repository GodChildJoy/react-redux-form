import React, { PropTypes } from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CoursesList from './CoursesList';
import toastr from 'toastr';

class CoursesPage extends React.Component {
  constructor(props, context) {
    // super is called parents constructor
    super(props, context);
    this.redirectToMangeCoursePage = this.redirectToMangeCoursePage.bind(this);
    this.deleteSelectCourse = this.deleteSelectCourse.bind(this);
  }

  // one way of redirect: using react router browserHistory
  redirectToMangeCoursePage(){
    browserHistory.push('/course');
  }

  deleteSelectCourse(id) {
    this.props.actions.deleteCourse(id)
      .then(() => {
        toastr.success('Course Deleted'+ id);
      }).catch((err) => {
        toastr.error(err);
      });
  }

  render () {
    return (
      <div>
        <h1> Courses Page </h1>
        <input
          className="btn-primary btn"
          value="Add Course"
          type="button"
          onClick={this.redirectToMangeCoursePage} />
        { this.props.courses.length > 0 && 
          <CoursesList
            courses={this.props.courses}
            deleteSelectCourse={this.deleteSelectCourse} />
        }
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// the pass in state is from the store
function mapStateToProps(state, ownProps) {
  return {
    // left courses will be the component courses,
    // right side courses come from the courseReducer
    courses: state.courses
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // manual dispatch
    //createCourse: (course) => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
