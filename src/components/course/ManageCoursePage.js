import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import { Lifecycle } from 'react-router';
import reactMixin  from 'react-mixin';


class ManageCoursePage extends React.Component {
  constructor(props, context) {
    // super is called parents constructor
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      dirty: false
    };
    this.onChange = this.onChange.bind(this);
    this.onCourseSave = this.onCourseSave.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
  }

  // make sure component state get the latest props
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  routerWillLeave(nextLocation) {
    if (this.state.dirty)
      return 'Your work is not saved! Are you sure you want to leave?';
  }

  onChange(event) {
    this.setState({dirty: true});
    let field = event.target.name;
    const course = this.state.course;
    course[field] = event.target.value;
    this.setState({course: course});
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved!');
    this.context.router.push('/courses');
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      //can not set non exist state object property straight using setState
      //this.setState({errors.title: 'the title has to have at least 5 charactors'});
      errors.title = "The title has to have at least 5 charactors";
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  onCourseSave(e) {
    e.preventDefault();

    if (!this.courseFormIsValid()) {
      this.setState({saving: false});
    } else {
      this.setState({saving: true});
      //this.props.createCourse(this.state.course);
      //add promise to make sure course saved so the course list has this saved course when redirect
      this.props.actions.saveCourse(this.state.course)
        .then(()=> this.redirect())
        .catch((err) => {
          toastr.error(err);
          this.setState({saving: false});
        });
        this.setState({dirty: false});
    }
  }

  render () {
    return (
      <div>
        <CourseForm course={this.state.course}
          options = {this.props.authors}
          saving = {this.state.saving}
          onChange = {this.onChange}
          onCourseSave = {this.onCourseSave}
          errors = {this.state.errors}
        />
      </div>
    );
  }

}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object.isRequired
};

// second way of redirect: using react router context router object
ManageCoursePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0];
  return null;
}

// the pass in state is from the store
// note: will not change the state in store, the logic here just changes this components props
function mapStateToProps(state, ownProps) {
  let course = {id: "", title: "", watchHref: "", authorId: "", length: "", category: ""};
  const courseId = ownProps.params.id; //come from path '/course/:id'
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsNewFormate = state.authors.map((author)=> {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName };
  });

  return {
    // left courses will be pass to ManageCoursePage component props,
    // right side course come from this local function inital line 109 or store
    course: course,
    authors: authorsNewFormate
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // manual dispatch
    //createCourse: (course) => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(courseActions, dispatch)
  };
}

reactMixin.onClass(ManageCoursePage, Lifecycle);
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
