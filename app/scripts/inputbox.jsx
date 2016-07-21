'use strict';
import React from 'react';
import SearchBar from 'react-search-bar';
import fetch from 'isomorphic-fetch';
import ReactDOM from 'react-dom';


class InputBox extends React.Component{
  constructor(props){
    super(props);
    this.state={
      timerid : null,
      htmlForSuggestion:null
    }
  }
  searchLocally(keyword){
    if(keyword=="")
      return [];
    var t1=this.props.pastSearch.filter(function(current,index,array){
      if(current.indexOf(keyword)!==-1)
        return true;
      return false;
    });
    return t1;
  }
  onClickSuggestion(current){
    console.log("clicked");
  }
  callBack(value){

    var that=this;
    var t1=setTimeout(function(){
      that.props.getUsers(value);
      that.state.timerid=null;
      },2000);
    this.setState({
      timerid : t1
    });
  }
  createHtmlForSuggestion(suggestion){
    var that=this;
    return suggestion.map(function(current,index,array){
      return (
        <div>
          <ul onClick={that.onClickSuggestion}>
            {current}
          </ul>
        </div>
      );
    });
  }
  onChange(){
    var value=ReactDOM.findDOMNode(this.refs.inputbox).value;
    var suggestion=this.searchLocally(value);
    var suggestionAnchor=ReactDOM.findDOMNode(this.refs.suggestionbox);
    var htmlForSuggestion=this.createHtmlForSuggestion(suggestion);
    this.setState({
      htmlForSuggestion : htmlForSuggestion
    })
    if(this.state.timerid!==null){
      clearTimeout(this.state.timerid);
      this.callBack(value);
    }
    else{
      this.callBack(value);
    }
  }
  render(){
    return (
      <div>
        <input className='input' ref="inputbox" type="text"  name="search" placeholder="enter user name" onChange={this.onChange.bind(this)}/>
        <div ref="suggestionbox">
          {this.state.htmlForSuggestion}
        </div>
      </div>
    );
  }
}


export default InputBox;