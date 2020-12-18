import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";
import { formatDate } from "./../utils/helpers";
import { handleToggleTweet } from "../actions/tweets";
// import icons from react-icons
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";
import { Link, withRouter } from 'react-router-dom';


class Tweet extends Component {
  toParent = (e ,id) => {
    e.preventDefault();
    //redirect to parent tweet
    this.props.history.push(`/tweet/${id}`)
  };
  handleLike = (e) => {
    const { tweet, authedUser, dispatch } = this.props;
    e.preventDefault();
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        authedUser: authedUser,
        hasLiked: tweet.hasLiked,
      })
    );
  };
  render() {
    const { tweet } = this.props;
    console.log(this.props)
    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      id,
      parent,
    } = tweet;
    if (tweet === null) {
      return <p>this tweet doesn't existed</p>;
    }

    return (
      <Link to={`/tweet/${id}`} className='tweet'>
        <img src={avatar} alt={`the avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, parent.id)}
              >
                replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked ? (
                <TiHeartFullOutline color="e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}
/**
 * mapStateToProps(arg1,arg2)
 * arg1===> state from store
 * arg2===> addtional props 
 */
const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  
  // if the tweet has a parent tweet or if it a reply on another tweet
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
    authedUser,
    users,
    tweets,
  };
};

export default withRouter(connect(mapStateToProps)(Tweet))