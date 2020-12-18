import { saveLikeToggle ,saveTweet} from "../utils/api";
import { showLoading,hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}
function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked,
  };
}
function addTweet(tweet){
  return{
    type:ADD_TWEET,
    tweet
  }
}


//async thunk action creator
export function handleToggleTweet(info) {
  return (dispatch) => {
    dispatch(toggleTweet(info));
    saveLikeToggle(info)
      .catch((e) => {
        console.warn("Error in handleToggleTweet: ", e);
        dispatch(toggleTweet(info));
        alert("There was an error liking the tweet. Try again.");
      });
  };
}
export function handleAddTweet (text ,replyingTo){
  return(dispatch ,getState)=>{
    const {authedUser} = getState();
    dispatch(showLoading())
    saveTweet({
      text,
      author:authedUser,
      replyingTo
    })
    .then((tweet)=>dispatch(addTweet(tweet)))
    .then(()=>dispatch(hideLoading()))
  }
}
