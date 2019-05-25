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




export class PostContainer extends React.Component {
  state = {
    posts:[]
  };


  componentDidMount() {
    const {userId} = this.props.userId.match.params;
    console.log("tada",this.props.userId.match.params)

    console.log(this.props)
    axios.get(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}&skip=0&limit=10`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })

  }


  handleClick = id => {
    this.props.history.push({
      pathname: `/PostDetails/${id}`,
    });

  };

  render() {
    return (
      this.state.posts.length>0 &&
      <ul> { this.state.posts.map(post => <div
        onClick={()=>this.handleClick(post.id)}
      ><b>Post Title: </b>{post.title} <a>Post details</a></div>)}</ul>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostContainer));

