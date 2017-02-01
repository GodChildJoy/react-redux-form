import React, { PropTypes } from 'react';
import TextInput from '../../common/TextInput';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authorActions from '../../actions/authorAction';
import toastr from 'toastr';

class ManageAuthorPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      saving: false,
      author: Object.assign({}, this.props.author),
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onAuthorSave = this.onAuthorSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id != nextProps.author.id) {
      this.setState({author: Object.assign({}, nextProps.author)});
    }
  }

  onChange(e) {
    const field = e.target.name;
    let author = this.state.author;
    author[field]= e.target.value;
    this.setState({author: author});
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Author saved!');
    browserHistory.push('/authors');
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 3) {
      formIsValid = false;
      errors.firstName = "First Name has to have at least 3 charactors";
    }
    if (this.state.author.lastName.length < 3) {
      formIsValid = false;
      errors.lastName = "Last Name has to have at least 3 charactors";
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  onAuthorSave(e) {
    e.preventDefault();
    if (this.authorFormIsValid()) {
      this.setState({saving: true});
      this.props.actions.saveAuthor(this.state.author)
        .then(()=> this.redirect())
        .catch((err) => {
          toastr.error(err);
          this.setState({saving: false});
        });
    }
  }

  render () {
    return (
      <div>
        <h1>Author Manage Page</h1>
        <form>
          <TextInput
            name="firstName"
            label="First Name"
            onChange={this.onChange}
            value={this.state.author.firstName}
            error={this.state.errors.firstName}
            placeholder="Please input author first name" />
          <TextInput
            name="lastName"
            label="Last Name"
            onChange={this.onChange}
            value={this.state.author.lastName}
            error={this.state.errors.firstName}
            placeholder="Please input author last name" />
          <input
            type="submit"
            disabled={this.state.saving}
            className="btn-primary btn"
            onClick={this.onAuthorSave}
            value={this.state.saving? "saving": "save"} />
        </form>
      </div>
    );
  }
}

ManageAuthorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
};

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id == id);
  if (author) return author[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  let author = { id: "", firtName: "", lastName: "" };
  if (ownProps.params.id && state.authors.length > 0) {
    author = getAuthorById(state.authors, ownProps.params.id);
  }
  return {
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(authorActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
