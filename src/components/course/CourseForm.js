import React, {PropTypes} from 'react';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

const CourseForm = ({course, options, saving, onChange, onCourseSave, errors}) => {
  return (
    <form>
      <h1> Manage Course Page </h1>
      <TextInput
        name="title"
        label="Title"
        onChange={onChange}
        value={course.title}
        error={errors.title}
        placeholder="Please input the course title" />
      <SelectInput
        name="authorId"
        label="Author"
        value={course.AuthorId}
        onChange={onChange}
        options={options}
        error={errors.authorId}
        defaultOption="Please select Author" />
      <TextInput
        name="category"
        label="Category"
        onChange={onChange}
        value={course.category}
        error={errors.category}
        placeholder="Please input the course category" />
      <TextInput
        name="length"
        label="Length"
        onChange={onChange}
        value={course.length}
        error={errors.length}
        placeholder="Please input the course length" />

      {/* when saving false disable the submit button */}
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onCourseSave}/>
    </form>
  );
};

CourseForm.propTypes = {
  course: React.PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  saving: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onCourseSave: PropTypes.func.isRequired,
  errors: PropTypes.object,
  placeholder: PropTypes.string,
  defaultOption: PropTypes.string
};

export default CourseForm;
