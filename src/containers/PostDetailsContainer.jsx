import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { appColor } from 'modules/theme';
import axios from 'axios';
import { getRepos, showAlert, switchMenu } from 'actions/index';
import { STATUS } from 'constants/index';
import {getAlUsers} from '../actions'
import { withRouter} from 'react-router-dom';




export class PostDetailsContainer extends React.Component {
  state = {
    postDetails:{},
    comments:[],
    showComments:false
  };


  componentDidMount() {
    const {postId} = this.props.postId.match.params;
    console.log("tada",this.props.postId.match.params)

    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => {
        const postDetails = res.data;
        this.setState({ postDetails });
      })

  }


  handleClick = id => {
    console.log("user",id)

    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        this.props.history.push({
          pathname: `/Posts/${id}`,
        });
      })



  };


  handleComments = id => {
    const {postId} = this.props.postId.match.params;

    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(res => {
        const comments = res.data;
        this.setState({ comments });
        this.setState({
          showComments:true
        })
      })




  };
  hideComments = id => {
    this.setState({
      showComments:false
    })
  };

  render() {
    console.log("here ",this.state)
    return (
      this.state.postDetails &&
      <div>
        <p>
          <b> Post Title: { this.state.postDetails.title} </b>
        </p>
        <p>
          <b>Post Body: </b> { this.state.postDetails.body}
        </p>
        <a onClick={()=>this.handleClick(this.state.postDetails.userId)}>Delete Post</a>
        <div onClick={this.handleComments}> <a> Show Comments</a> </div>

        {this.state.comments && this.state.showComments &&(<div>
            <ul> { this.state.comments.map(comment => <div
            >{comment.name}</div>)}</ul>
            <div onClick={this.hideComments}> <a> Hide Comments</a> </div>  </div>

        )}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Posts:state,

  };
}

const mapDispatchToProps = dispatch => ({
  getAlUserDetails: () => dispatch(getAlUsers()),

});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostDetailsContainer));

