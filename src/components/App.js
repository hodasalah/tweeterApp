import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router-dom'
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from 'react-redux-loading'
import NewTweet from "./NewTweet";
import TweetPage from './TweetPage';
import Nav from './Nav'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
    <div>
      <LoadingBar />
      <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />
                </div>}
          </div>
    </div>);
  }
}

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null,
});
export default connect(mapStateToProps)(App);
