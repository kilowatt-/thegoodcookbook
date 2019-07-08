import React from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { increment } from "../actions";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { updateInput } from "../actions";
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
    },
    textField: {
        marginLeft: 8,
        marginRight: 8
    },
    dense: {
        marginTop: 8,
    },
    menu: {
        width: 200,
    },
    searchIngredients:{
        margin: 8,
        height: 40
    }
};

const SearchTypes = ['Name', 'Ingredient'].map(function(key){
    return {label: key, value: key}
})

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
                {this.getSearchBar()}
                <TextField
                    id="filled-select-search"
                    select
                    label="Select"
                    value={this.props.searchType}
                    onChange={event => this.props.updateInput(['searchType', event.target.value])}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Search By"
                    margin="normal"
                    variant="filled"
                >
                    {SearchTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
        )
    }

    getSearchBar(){
        const { classes } = this.props;
        if (this.props.searchType == 'Ingredient'){
            return (
                <ChipInput
                helperText="Select Your!"
                className={classes.searchIngredients}
                fullWidth
                margin="normal"
                //variant="filled"
                defaultValue={[]}
                onChange={chips => this.props.updateInput(['chipSearch', chips])}
                InputLabelProps={{
                    shrink: true,
                }}
                />)
        }else{
            return (
                <TextField
                    id="filled-full-width"
                    label="Search For a Recipe"
                    style={{ margin: 8, backgroundColor: 'lightgray' }}
                    placeholder="ex: Pesto Ravioli"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    onChange={event => this.props.updateInput(['searchBar', event.target.value])}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            )
        }

    }

}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return { searchType: state.inputReducer.searchType };
}

export default compose(withStyles(styles), connect(mapStateToProps, { updateInput }))(SearchBar);
