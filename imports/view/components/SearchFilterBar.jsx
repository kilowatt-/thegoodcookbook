import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar.jsx'
import FilterBar from './FilterBar.jsx';
import RandomRecipeButton from './RandomRecipeButton.jsx';
import PostRecipeButton from './PostRecipeButton.jsx';
import { NavBarTabs } from '../../model/NavBarTabs.js';
import '../style/SearchFilterBar.css';
import {Meteor} from "meteor/meteor";

class SearchFilterBar extends React.Component {
  render() {
    return (
      <div>{(this.props.currentTab === NavBarTabs.FAVORITES) || (this.props.currentTab === NavBarTabs.ALL) || (this.props.currentTab === NavBarTabs.ADDED) ?
        <div className="search-filter-bar">
          <div className="search-filter-section">
            <SearchBar />
            <FilterBar />
          </div>
          {this.props.currentTab === NavBarTabs.ALL? <RandomRecipeButton /> : null}
          {this.props.currentTab === NavBarTabs.ADDED? <PostRecipeButton /> : null}
        </div> : null
      }</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab
  }
}

export default connect(mapStateToProps)(SearchFilterBar);
