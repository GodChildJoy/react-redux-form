import React, { PropTypes } from 'react';
import * as authorActions from '../../actions/authorAction';
import { bindActionCreators } from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import AuthorsList from './AuthorsList';

class AuthorPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.redirectToMangeAuthorPage = this.redirectToMangeAuthorPage.bind(this);
  }

  redirectToMangeAuthorPage() {
    browserHistory.push('/author');
  }

  render () {
    return (
      <div>
        <h1>Author Page</h1>
        <input
          type="button"
          value="add Author"
          className="btn btn-primary"
          onClick={this.redirectToMangeAuthorPage} />
        <AuthorsList authors={this.props.authors}/>
      </div>
    );
  }
}

AuthorPage.propTypes = {
  authors: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return { authors: state.authors };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(authorActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
