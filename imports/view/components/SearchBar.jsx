import React from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { updateInput } from "../../controller/actions/input.js";
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import '../style/SearchFilterBar.css';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
        margin: 8
    },
    textField: {
        margin:0,
        marginTop: 8
    },
    menu: {
        width: 200,
    },
    searchIngredients:{
        margin: 0,
        marginTop: 8
    }
};

const SearchTypes = ['Name', 'Ingredients'].map(function(key){
    return {label: key, value: key}
})

class SearchBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="search-section">
                {this.TextFields()}
            </div>);
    }

    TextFields() {
        const { classes } = this.props;
        return (
            <form className={classes.container} action="javascript:void(-1)" noValidate autoComplete="off">
                <TextField
                    id="outlined-select-search"
                    select
                    label="Search By"
                    value={this.props.searchType}
                    onChange={event => this.props.updateInput(['searchType', event.target.value])}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    variant="outlined"
                >
                    {SearchTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {this.getSearchBar()}
            </form>
        )
    }

    getSearchBar(){
        const { classes } = this.props;
        if (this.props.searchType == 'Ingredients'){
            return (
                <ChipInput
                id="outlined-simple-start-adornment"
                className={classes.searchIngredients}
                placeholder="Search Ingredients"
                fullWidth
                variant="outlined"
                defaultValue={[]}
                onChange={chips => this.props.updateInput(['chipSearch', chips])}
                />)
        }else{
            return (
                <TextField
                    id="outlined-simple-start-adornment"
                    className={classes.textField}
                    placeholder="Find a Recipe"
                    fullWidth
                    variant="outlined"
                    onChange={event => this.props.updateInput(['searchBar', event.target.value])}
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
