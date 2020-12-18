import React, { Component } from 'react'
import {handleAddTweet} from '../actions/tweets';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class NewTweet extends Component {
    state={
        text:'',
        toHome:false
    }
    handleChange=(e)=>{
        e.preventDefault();
        const text = e.target.value
        this.setState(()=>({text}))
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const {text}=this.state;
        const {dispatch,id} =this.props;
        //todo: add text to state store
        dispatch(handleAddTweet(text,id))
        this.setState(()=>({
            text:'',
            toHome: id ? false : true,
        }))
    }

    render() {
        const { text, toHome } = this.state
        const tweetLeft =280 - this.state.text.length;
        //redirect to  / if submitted
        if (toHome === true) {
            return <Redirect to='/' />
        }
        
        return (
            <div>
                <h3 className="center">Compose New Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea 
                        placeholder="what's happening"
                        value={text}
                        onChange={this.handleChange}
                        className="textarea"
                        maxLength={280}
                    />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button className="btn"
                        disabled={text === ''}
                    >submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null)(NewTweet)

