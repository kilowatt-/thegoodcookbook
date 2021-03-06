import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {connect} from "react-redux";
import {compose} from "redux";
import Recipes from "../../api/recipes";
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {closeDetailedView, openDetailedView} from "../../controller/actions/detailedView.js";
import RecipeDetails from "./RecipeDetails";
import "../style/RecipeCards.css";
import Favourites from "../../api/favourites";
import Icon from "@material-ui/core/Icon";
import {Session} from "meteor/session"
import {NavBarTabs} from "../../model/NavBarTabs.js";
import Tooltip from "@material-ui/core/Tooltip";
import {Meteor} from "meteor/meteor";
import getStars from "../stars";

const PAGE_SIZE = 8;

class RecipeCards extends Component {
    state = {
        detailDialogOpen: false,
        backToTopButton: false
    };

    constructor(props) {
        super(props);
        this.openDetailedView = this.openDetailedView.bind(this);
        this.closeRecipeDetails = this.closeRecipeDetails.bind(this);
        this.isInFavourites = this.isInFavourites.bind(this);
        this.addToFavourites = this.addToFavourites.bind(this);
        this.removeFromFavourites = this.removeFromFavourites.bind(this);
        Session.setDefault("recipePage", PAGE_SIZE);
        Session.setDefault("recipeID", "");
        this.backToTop = this.backToTop.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        Session.set("recipePage", PAGE_SIZE);
    }

    // noinspection JSUnusedLocalSymbols
    componentDidUpdate(prevProps, prevState, snapshot) {
        Session.set("favourites", this.props.currentTab === NavBarTabs.FAVORITES);

        if (this.props.currentTab === NavBarTabs.FAVORITES) {
            Session.set("favouritesList", this.props.favourites.favourites);
        }
    }

    openDetailedView(recipeID) {
        Session.set("recipeID", recipeID);
        this.props.openDetailedView();
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        if ((window.scrollY > screen.height * 4) && !this.state.backToTopButton) {
            this.setState({backToTopButton: true});
        }
        if ((window.scrollY < screen.height * 4) && this.state.backToTopButton) {
            this.setState({backToTopButton: false});
        }
    }


    closeRecipeDetails() {
        this.props.closeDetailedView();
    };

    backToTop() {
        window.scrollTo(0, 0);
    }

    moreIngredientsFlag(recipe) {
        if (!Session.get("chipSearch") || !Session.get("chipSearch").length) {
            return
        }
        if (recipe.intersection_count < recipe.ingredients.length) {
            let numMissingIngredients = recipe.ingredients.length - recipe.intersection_count
            let missingIngredients = recipe.ingredients.filter(ingredient => {
                let i = ingredient.ingredient.name.toLowerCase();
                return !Session.get("chipSearch").includes(i);
            }).map(ingredient => ingredient.ingredient.name);
            return (
                <div className="more-ingredients-flag">
                    <div className="more-ingredients-flag-label">
                        {numMissingIngredients} additional {numMissingIngredients > 1 ? <span>ingredients</span> :
                        <span>ingredient</span>} needed:
                    </div>
                    <div className="more-ingredients-flag-ingredients">
                        {missingIngredients.map(ingredient =>
                            <span>{missingIngredients.findIndex(i => i === ingredient) === 0 ? "" : ", "}<span>{ingredient}</span></span>)}
                    </div>
                </div>
            )
        } else {
            return
        }
    }

    getMissingIngredientsRecipes() {
        if (!Session.get("chipSearch") || !Session.get("chipSearch").length) {
            return [];
        } else {
            return this.props.recipes.filter(recipe =>
                recipe.intersection_count < recipe.ingredients.length
            )
        }
    }

    getRecipeCard(recipe) {
        return (
            <div className="card" id={recipe._id} key={recipe._id}>
                <Card>
                    <CardMedia className="recipe-cards-image"
                               component="img"
                               src={recipe.imgUrl}
                               style={{height: "50%"}}
                    />
                    <CardContent className="recipe-card-content-container">
                        <div className="card-title-text">
                            <Typography gutterBottom variant="h5" component="h2">
                                {recipe.recipeName}
                            </Typography>
                            {this.moreIngredientsFlag(recipe)}
                        </div>
                        <div className="card-body-section">
                            <div className="card-rating-stars">
                                {getStars(Number(recipe.avgRating), "recipeCards")}
                            </div>
                            <div className="card-summary-info">
                                <div className="card-summary-info-item">
                                    <Typography>{recipe.difficulty}</Typography>
                                </div>
                                <div className="card-summary-info-item">
                                    <Icon>access_time</Icon>
                                    <Typography className="recipe-time-text">{recipe.time + " mins"}</Typography>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.openDetailedView(recipe._id)} size="small">
                            See Recipe
                        </Button>
                        {this.props.user && !Session.get("addedOnly") ? <Button size="small" onClick={() => {
                            this.isInFavourites(recipe) ? this.removeFromFavourites(recipe._id) :
                                this.addToFavourites(recipe._id)
                        }}>{this.isInFavourites(recipe) ? "Unsave" : "Save"}</Button> : null}
                    </CardActions>
                </Card>
            </div>
        )
    }

    render() {
        let missingIngredientsRecipes = this.getMissingIngredientsRecipes();
        let recipes = (this.props.recommended ? this.props.recommended : this.props.recipes);

        return (
            <div>
                {this.props.currentTab === NavBarTabs.HOME && this.props.user ? null :
                    <div>
                        {this.props.recipeLoadingState.loading ? <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div> : <div className="recipe-cards-page">
                            {Session.get("favourites") && recipes.length < 1 ?
                                <div className="no-cards-message">You have not saved any recipes</div> : null}
                            {Session.get("addedOnly") && recipes.length < 1 ?
                                <div className="no-cards-message">You have not added any recipes</div> : null}
                            {!Session.get("favourites") && !Session.get("addedOnly") && recipes.length < 1 ?
                                <div className="no-cards-message">No recipes match your criteria</div> : null}
                            <div className="card-container">
                                {recipes.filter(recipe => !missingIngredientsRecipes.includes(recipe)).map(recipe => (
                                    this.getRecipeCard(recipe)
                                ))}
                            </div>
                            {missingIngredientsRecipes.length > 0 ? <div className="missing-ingredients-card-container">
                                <div className="missing-ingredients-title">Recipes That Need Additional Ingredients
                                </div>
                                <div className="card-container">
                                    {missingIngredientsRecipes.map(recipe => (this.getRecipeCard(recipe)))}
                                </div>
                            </div> : null}
                            {this.props.recommended || this.props.recipes.length >= this.props.numRecipesTotal ? null
                                : <div className="see-more-button">
                                    <Button onClick={() => this.moreRecipes()}>
                                        See More
                                    </Button>
                                </div>}
                            {this.state.backToTopButton ?
                                <div className="back-to-top-button">
                                    <Tooltip title="Back to Top">
                                        <Button className="back-to-top-button" onClick={this.backToTop}>
                                            <Icon>arrow_upward</Icon>
                                        </Button>
                                    </Tooltip>
                                </div> : null}
                            <RecipeDetails
                                dialogOpen={this.props.dialogOpen}
                                closeDialog={this.closeRecipeDetails}
                            />
                        </div>}
                    </div>
                }
            </div>
        );
    }

    isInFavourites(item) {
        if (this.props.favourites)
            return this.props.favourites.favourites.includes(item._id);
        return false;
    }

    addToFavourites(id) {
        let array = [...this.props.favourites.favourites];

        array.push(id);

        Meteor.call("favourites.update", Meteor.userId(), array);
        Meteor.call("recipes.increaseFavouriteCount", id);
    }

    removeFromFavourites(id) {
        let array = [...this.props.favourites.favourites];

        let index = array.findIndex((str) => str === id);

        if (index !== -1) {
            array.splice(index, 1);

            Meteor.call("favourites.update", Meteor.userId(), array);
            Meteor.call("recipes.decreaseFavouriteCount", id);
        }
    }

    moreRecipes() {
        Session.set("recipePage", Session.get("recipePage") + PAGE_SIZE)
    }
}


const mapStateToProps = (state) => {
    Session.set("selectedDifficulty", state.inputReducer.selectedDifficulty);
    Session.set("recipeType", state.inputReducer.recipeType);
    Session.set("selectedTiming", state.inputReducer.selectedTiming);
    Session.set("searchText", state.inputReducer.searchBar);
    Session.set("chipSearch", state.inputReducer.chipSearch);
    Session.set("favourites", state.currentTab === NavBarTabs.FAVORITES);
    Session.set("addedOnly", state.currentTab === NavBarTabs.ADDED);
    return {
        dialogOpen: state.detailedViewOpened,
        currentTab: state.currentTab,
        recipeLoadingState: state.loadRecipe,
        favouritesLoadingState: state.favourites
    };
};

export const getFilter = () => {
    let filter = {};
    const difficulty = Session.get("selectedDifficulty");
    const foodType = Session.get("recipeType");
    const selectedTiming = Session.get("selectedTiming");
    const searchText = Session.get("searchText");
    const chipSearch = Session.get("chipSearch");
    const favourites = Session.get("favourites");
    const addedOnly = Session.get("addedOnly");
    if (difficulty) {
        filter.difficulty = difficulty
    }
    if (foodType) {
        filter.foodType = foodType
    }
    if (selectedTiming) {
        filter.time = {$lt: selectedTiming}
    }
    if (searchText) {
        filter.recipeName = {$regex: new RegExp(searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "i")};
    }
    if (favourites) {
        filter._id =
            {
                $in: Session.get("favouritesList")
            }
    }
    if (addedOnly) {
        filter.createdBy = Meteor.userId();
    }
    if (chipSearch && chipSearch.length) {
        filter.intersection_count = {$gt: 0}
    }

    return filter;
};

const getAddFields = () => {
    const chipSearch = Session.get("chipSearch");
    if (chipSearch && chipSearch.length) {
        return [{
            $addFields: {
                intersection_count: {
                    $size: {
                        $setIntersection: [
                            {
                                $map: {
                                    input: "$ingredients.ingredient.name",
                                    in: {$toLower: "$$this"}
                                }
                            },
                            chipSearch.map(function (x) {
                                return x.toLowerCase();
                            })
                        ]
                    }
                },
              ingredient_count: {
                $size: "$ingredients"
              }
            }
        },
        {$addFields: {
          ingredient_needed_count: {
            $subtract: ["$ingredient_count", "$intersection_count"]
          }
        }}];
    }
    return null;
};

const getSort = () => {
    const chipSearch = Session.get("chipSearch");

    if (chipSearch && chipSearch.length) {
        return {$sort: {ingredient_needed_count: 1}}
    }
    return null;
};

export const updateRecipes = () => {
    Meteor.call("recipes.getRecipes", getFilter(), getAddFields(), getSort(), Session.get("recipePage"), function (err, data) {
        if (err) {
            throw(err);
        } else {
            Session.set("recipes", data)
        }
    })
};

export default compose(
    withTracker(() => {
        updateRecipes();
        return {
            recipes: Session.get("recipes") || [],
            user: Meteor.user(),
            favourites: Favourites.findOne({_id: Meteor.userId()}),
            numRecipesTotal: Recipes.find(getFilter()).count()
        };

    }), connect(mapStateToProps, {openDetailedView, closeDetailedView}))(RecipeCards);
