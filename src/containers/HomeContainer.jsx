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




export class HomeContainer extends React.Component {
  state = {
    persons: [],
    posts:[]
  };


  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })

  }


  handleClick = id => {
    this.props.history.push({
      pathname: `/Posts/${id}`,
    });
    console.log("user",id)


  };

  render() {
      return (
        this.state.persons.length>0 &&
          <div>
            <b>Users</b>
        <ul> { this.state.persons.map(person => <div
          onClick={()=>this.handleClick(person.id)}
        >{person.name} <a>Blog Posts</a></div>)}</ul>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));

