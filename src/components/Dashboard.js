import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";

class Dashboard extends Component {
    
  render() {
    const {tweetsIds} =this.props;
    const tweetsList =tweetsIds.map(id=>{
        return  (<li key={id}>
                    <Tweet id={id}/>
                </li>)
    })
    return(
        <div>
            <h3 className="center">Your Timeline</h3>
            <ul className="dashboard-list">{tweetsList}</ul>
        </div>
    );
  }
}
const mapStateToProps = ({tweets}) => ({
    tweetsIds: Object.keys(tweets).sort((a ,b)=>tweets[b].timestamp - tweets[a].timestamp)
});
export default connect(mapStateToProps)(Dashboard);
