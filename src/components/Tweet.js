import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";

class Tweet extends Component {
  render() {
    console.log(this.props.tweet);
    return <div className="tweet"></div>;
  }
}
const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  return {
    tweet: formatTweet(tweet, users[tweet.author], authedUser),
    authedUser,
    users,
    tweets,
  };
};
export default connect(mapStateToProps)(Tweet);
