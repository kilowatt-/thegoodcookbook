import React from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { increment } from "../actions";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { updateInput } from "../actions";
import PropTypes from 'prop-types';


const recipes = [
    {
        value: 'Asian',
        label: 'Asian',
    },
    {
        value: 'American',
        label: 'American',
    },
    {
        value: 'Italian',
        label: 'Italian',
    },
    {
        value: 'Mexican',
        label: 'Mexican',
    },
];

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


class SearchBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.TextFields()}
            </div>);
    }

    TextFields() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="filled-full-width"
                    label="Search For a Recipe"
                    style={{ margin: 8 }}
                    placeholder="ex: Pesto Ravioli"
                    helperText="Full width!"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    onChange={event => this.props.updateInput(['searchBar', event.target.value])}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="filled-select-recipe"
                    select
                    label="Select"
                    className={classes.textField}
                    value='EUR'
                    onChange={event => this.props.updateInput(['recipeType', event.target.value])}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select your currency"
                    margin="normal"
                    variant="filled"
                >
                    {recipes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
        )
    }

}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(null, { updateInput }))(SearchBar);
