import React, { Component } from "react";
import { connect } from "react-redux";
import NewTweet from "./NewTweet";
import Tweet from "./Tweet";

class TweetPage extends Component {
  render() {
    const { id, replies } = this.props;
    const repliesList = replies.length && (
            <div>
                <h3 className="center">Replies</h3>
                {replies.map((replyId) =>(
                <div key={replyId}>
                    <ul>
                    <Tweet id={replyId} />
                    </ul>
                </div>
                ))};
            </div>
        )
    
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {repliesList}
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser, tweets, users }, props) => {
  const { id } = props.match.params;
  const replies = !tweets[id]
    ? []
    : tweets[id].replies.sort(
        (a, b) => tweets[b].timestamp - tweets[a].timestamp
      );
  return {
    id,
    replies,
    tweets,
    users,
    authedUser,
  };
};
export default connect(mapStateToProps)(TweetPage);
