import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Meteor } from 'meteor/meteor';
import { browseFavorites, browseAdded, browseAll } from '../../controller/actions/navBar.js';
import Button from '@material-ui/core/Button';
import { NavBarTabs } from '../../model/NavBarTabs.js';
import '../style/NavBar.css';

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
      <div className={this.props.currentTab === NavBarTabs.HOME? "nav-bar-container home-nav-bar-container" : "nav-bar-container"}>
        {this.props.user ?
          <div className="nav-bar">
            <div className="nav-bar-buttons">
              <Button onClick={this.browseAll}>All Recipes</Button>
              {this.props.currentTab === NavBarTabs.ALL? <hr></hr> : null}
            </div>
            <div className="nav-bar-buttons">
              <Button onClick={this.browseFavorites}>My Favorites</Button>
              {this.props.currentTab === NavBarTabs.FAVORITES? <hr></hr> : null}
            </div>
            <div className="nav-bar-buttons">
              <Button onClick={this.browseAdded}>My Added Recipes</Button>
              {this.props.currentTab === NavBarTabs.ADDED? <hr></hr> : null}
            </div>
          </div> : null
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab
  }
};

export default compose(
	withTracker(() => {
		return {
			user: Meteor.user()
		};
}), connect(mapStateToProps, { browseAll, browseAdded, browseFavorites }))(NavBar);
