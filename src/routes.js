import React from 'react';
import {Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import AuthorPage from './components/author/AuthorPage';
import ManageAuthorPage from './components/author/ManageAuthorPage';
import NotFoundPage from './components/NotFoundPage';

//here using the (); excute the Route function
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage}/>
    <Route path="courses" component={CoursesPage}/>
    <Route path="course" component={ManageCoursePage}/>
    <Route path="course/:id" component={ManageCoursePage}/>
    <Route path="authors" component={AuthorPage}/>
    <Route path="author" component={ManageAuthorPage}/>
    <Route path="author/:id" component={ManageAuthorPage}/>
    <Route path='404' component={NotFoundPage} />
    <Redirect from='*' to='404' />
  </Route>
);
