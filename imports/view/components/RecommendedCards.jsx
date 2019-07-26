import RecipeCards from './RecipeCards'
import {compose} from "redux";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {connect} from "react-redux";
import {setRecipeDetails} from "../../controller/actions/recipe";
import {closeDetailedView, openDetailedView} from "../../controller/actions/detailedView";
import React from "react";
import '../style/RecipeCards.css';

class RecommendedCards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recommendations: []
        }
    }

    componentDidMount() {
        this.updateCards();
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user)
            this.updateCards();
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

    render() {
        if (this.props.user) {
            if (!this.props.loading) {
                return (
                    <div>
                        <h2>Recommended for You</h2>
                        <RecipeCards recommended={this.state.recommendations}/>
                    </div>)
            }
            else {
                return (
                    <div>
                        <h2>Recommended for you</h2>
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                )
            }
        }
        else
            return null;
    }
}

export default compose(
    withTracker(() => {
        return {
            user: Meteor.user(),
        }

    }),connect(null, { setRecipeDetails, openDetailedView, closeDetailedView }))(RecommendedCards);