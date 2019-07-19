import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Meteor } from 'meteor/meteor';
import { browseFavorites, browseAdded, browseAll } from '../../controller/actions/navBar.js';
import Button from '@material-ui/core/Button';
import SearchBar from './SearchBar.jsx'
import FilterBar from './FilterBar.jsx';
import RandomRecipeButton from './RandomRecipeButton.jsx';
import { NavBarTabs } from '../../model/NavBarTabs.js';
import PostRecipeButton from './PostRecipeButton.jsx';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.browseAll = this.browseAll.bind(this);
    this.browseFavorites = this.browseFavorites.bind(this);
    this.browseAdded = this.browseAdded.bind(this);
  }

  browseAll(event) {
    event.preventDefault();
    this.props.browseAll();
  }

  browseFavorites(event) {
    event.preventDefault();
    this.props.browseFavorites();
  }

  browseAdded(event) {
    event.preventDefault();
    this.props.browseAdded();
  }

  render() {
    return (
      <div className="nav-bar-container">
        {this.props.user ?
          <div className="nav-bar">
            <Button onClick={this.browseAll}>All Recipes</Button>
            <Button onClick={this.browseFavorites}>My Favorites</Button>
            <Button onClick={this.browseAdded}>My Added Recipes</Button>
          </div> :
          <div></div>
        }
        <hr></hr>
        <div className="search-filter-bar">
          <SearchBar />
          <FilterBar />
          {this.props.currentTab === NavBarTabs.ALL? <RandomRecipeButton /> : null}
          {this.props.currentTab === NavBarTabs.ADDED? <PostRecipeButton /> : null}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab
  }
}

export default compose(
	withTracker(() => {
		return {
			user: Meteor.user()
		};
}), connect(mapStateToProps, { browseAll, browseAdded, browseFavorites }))(NavBar);
