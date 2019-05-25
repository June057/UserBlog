import React from 'react';
import PostsContainer from '../containers/PostsContainer';

const Posts = (props) => (
  <React.Fragment>
    <PostsContainer {...props}/>
  </React.Fragment>
);

export default Posts;
