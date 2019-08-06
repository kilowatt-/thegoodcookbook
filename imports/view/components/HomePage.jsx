import {compose} from "redux";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {connect} from "react-redux";
import {setRecipeDetails} from "../../controller/actions/recipe";
import {closeDetailedView, openDetailedView} from "../../controller/actions/detailedView";
import React from "react";
import '../style/RecipeCards.css';
import Favourites from "../../api/favourites";
import {Session} from "meteor/session";
import {NavBarTabs} from "../../model/NavBarTabs";
import RecipeDetails from './RecipeDetails';
import '../style/HomePage.css';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const SLIDER_WIDTH = 2000;
const SLIDER_ITEM_MARGIN = 8;

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recommendations: [],
            numFavourites: 0,
            inDetailedView: false
        }

        this.openDetailedView = this.openDetailedView.bind(this);
        this.closeRecipeDetails = this.closeRecipeDetails.bind(this);
        this.getWidth = this.getWidth.bind(this);
    }

    componentDidMount() {
        this.updateCards();
    }

    componentDidUpdate(prevProps) {
      if (this.props.user !== prevProps.user || (prevProps.favourites && this.props.favourites
          && this.props.favourites.length !== prevProps.favourites.length)) {
            this.updateCards();
          }
    }

    updateCards() {
        if (this.props.user) {
            this.setState({
                loading: true
            });
            Meteor.call('getRecommended', (error, result) => {
                if (error) {
                    throw error;
                } else {
                    this.setState({
                        loading: false,
                        recommendations: result,
                        numFavourites: this.props.favourites.favourites.length
                    })
                }

            })
        } else {
            this.setState({
                loading: false,
                recommendations: []
            });
        }
    }

    openDetailedView(recipe) {
      Session.set('recipeID', recipe._id);
      this.props.openDetailedView();
      this.setState({inDetailedView: true});
    }

    closeRecipeDetails() {
      this.props.closeDetailedView();
      this.setState({inDetailedView: false});
    };

    getWidth() {
      let totalWidth = SLIDER_WIDTH - (SLIDER_ITEM_MARGIN * this.state.recommendations.length);
      return totalWidth/this.state.recommendations.length;
    }

    render() {

        if (this.props.user && this.props.currentTab === NavBarTabs.HOME) {
            if (!this.state.loading || this.state.inDetailedView) {
                return (
                  <div>
                    <div className="home-page-container">
                    {this.state.numFavourites > 0 && this.state.recommendations.length > 0?
                      <div className="recommended-recipes-container">
                      <div className="home-section-title">Recommended for You</div>
                        <div className="scroll-container">
                          <div className="recommended-recipes-content">
                          {this.state.recommendations.map(recipe => (
                            <div className="home-recipe-card recommended-recipe-card" key={recipe._id} onClick={() => this.openDetailedView(recipe)}>
                              <div className="recommended-recipe-image recipe-details-image" style={{width: this.getWidth()}}>
                                <Card>
                                  <CardMedia
                                    component="img"
                                    src={recipe.imgUrl}
                                    style={{height: "100%"}}
                                  />
                                </Card>
                              </div>
                              <div className="home-recipe-title">
                                {recipe.recipeName}
                              </div>
                            </div>
                          ))}
                          </div>
                      </div>
                    </div>
                    : null}
                      <div className="top-rated-recently-added-container">
                        <div className="top-rated-recipes-container trra-subcontainer">
                          <div className="home-section-title">Top Rated</div>
                          {this.props.topRated.map(recipe => (
                            <div className="home-recipe-card" key={recipe._id} onClick={() => this.openDetailedView(recipe)}>
                              <div className="recipe-details-image">
                                <Card>
                                  <CardMedia
                                    component="img"
                                    src={recipe.imgUrl}
                                    style={{height: "100%"}}
                                  />
                                </Card>
                              </div>
                              <div className="home-recipe-title">
                                {recipe.recipeName}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="recently-added-recipes-container trra-subcontainer">
                          <div className="home-section-title">Recently Added</div>
                          {this.props.mostRecent.map(recipe => (
                            <div className="home-recipe-card" key={recipe._id} onClick={() => this.openDetailedView(recipe)}>
                              <div className="recipe-details-image">
                                <Card>
                                  <CardMedia
                                    component="img"
                                    src={recipe.imgUrl}
                                    style={{height: "100%"}}
                                  />
                                </Card>
                              </div>
                              <div className="home-recipe-title">
                                {recipe.recipeName}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <RecipeDetails
                        dialogOpen={this.props.dialogOpen}
                        closeDialog={this.closeRecipeDetails}
                    />
                  </div>)
            } else {
                return (
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                )
            }
        }
        else
            return null;
    }
}

const mapStateToProps = (state) => {
    return {
        currentTab: state.currentTab,
        dialogOpen: state.detailedViewOpened
    }
}

const NUM_RECIPES = 5;

export default compose(
    withTracker(() => {
        return {
            user: Meteor.user(),
            favourites: Favourites.findOne({_id: Meteor.userId()}),
            topRated: Recipes.find({}, {sort: {avgRating: -1, "numRatings": -1}, limit: NUM_RECIPES, nearestNeighbours: 0}).fetch(),
            mostRecent: Recipes.find({}, {sort: {dateAdded: -1}, limit: NUM_RECIPES, nearestNeighbours: 0}).fetch()
        }

    }),connect(mapStateToProps, { setRecipeDetails, openDetailedView, closeDetailedView }))(HomePage);
