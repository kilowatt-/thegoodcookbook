import React from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { updateInput } from "../../controller/actions/input.js";
import PropTypes from 'prop-types';
import FoodType from '../../model/FoodType.js';
import Difficulty from '../../model/Difficulty.js';


const FoodTypes = Object.keys(FoodType.FoodType).map(function(key){
    return {label: key, value: FoodType.FoodType[key]}
})

const Difficulties = Object.keys(Difficulty.Difficulty).map(function(key){
    return {label: key, value: Difficulty.Difficulty[key]}
})

const Timings = [10,20,30,40,50,60].map(function(key){
    return {label: key, value: key}
})




const styles = {
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
    },
    textField: {
        marginLeft: 8,
        marginRight: 8,
    },
    dense: {
        marginTop: 8,
    },
    menu: {
        width: 200,
    },
};


class FilterBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.FilterFields()}
            </div>);
    }

    FilterFields() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="filled-select-recipe"
                    select
                    label="Select"
                    style={{ color: 'lightgray' }}
                    className={classes.textField}
                    value={this.props.recipeType}
                    onChange={event => this.props.updateInput(['recipeType', event.target.value])}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Recipe Type"
                    margin="normal"
                    variant="filled"
                >
                    {FoodTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="filled-select-difficulty"
                    select
                    label="Select"
                    className={classes.textField}
                    value={this.props.selectedDifficulty}
                    onChange={event => this.props.updateInput(['selectedDifficulty', event.target.value])}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Difficulty"
                    margin="normal"
                    variant="filled"
                >
                    {Difficulties.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                id="filled-select-timing"
                select
                label="Select"
                className={classes.textField}
                value={this.props.selectedTiming}
                onChange={event => this.props.updateInput(['selectedTiming', event.target.value])}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                helperText="Timing"
                margin="normal"
                variant="filled"
            >
                {Timings.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                         {"<" + option.label}
                    </MenuItem>
                ))}
            </TextField>
            </form>
        )
    }

}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return { recipeType: state.inputReducer.recipeType,
        selectedDifficulty: state.inputReducer.selectedDifficulty,
        selectedTiming: state.inputReducer.selectedTiming };
}

export default compose(withStyles(styles), connect(mapStateToProps, { updateInput }))(FilterBar);
