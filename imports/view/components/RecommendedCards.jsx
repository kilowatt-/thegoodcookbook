import RecipeCards from './RecipeCards'
import {compose} from "redux";
import {withTracker} from "meteor/react-meteor-data";
import Recipes from "../../api/recipes";
import {Meteor} from "meteor/meteor";
import Favourites from "../../api/favourites";
import {connect} from "react-redux";
import {setRecipeDetails} from "../../controller/actions/recipe";
import {closeDetailedView, openDetailedView} from "../../controller/actions/detailedView";
import React from "react";

let LIMIT = 5;

class RecommendedCards extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (Meteor.user())
            return (
                <div>
                    <h2>Recommended for You</h2>
                    <RecipeCards recommended={this.props.recipes} />
                </div>);
        else
            return null;
    }
}

const mapStateToProps = (state) => {
    return {
        dialogOpen: state.detailedViewOpened,
        favouritesToggle: state.favourites.selected
    };
};

export default compose(
    withTracker(() => {
        return {recipes: Recipes.find({"favouriteCount": {$gt: 0}}, {limit: LIMIT,
                sort: {"favouriteCount": -1}}).fetch(),
            user: Meteor.user(),
            favourites: (Meteor.user() ? Favourites.findOne({_id: Meteor.userId()}) : null)
        };

    }),connect(mapStateToProps, { setRecipeDetails, openDetailedView, closeDetailedView }))(RecommendedCards);