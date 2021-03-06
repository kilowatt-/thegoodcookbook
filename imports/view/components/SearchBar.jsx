import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {updateInput} from "../../controller/actions/input.js";
import PropTypes from "prop-types";
import ChipInput from "material-ui-chip-input";
import "../style/SearchFilterBar.css";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    overrides: {
        MuiInputLabel: {
            root: {
                "&$focused": {
                    color: "rgba(0, 0, 0, 0.54)"
                }
            }
        }
    }
});

const styles = {
    container: {
        display: "flex",
        flexWrap: "nowrap",
        margin: 8
    },
    textField: {
        margin: 0,
        marginTop: 8
    },
    menu: {
        width: 200,
    },
    searchIngredients: {
        margin: 0,
        marginTop: 8
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: "#A5AD8B"
        },
        "& label.Mui-focused": {
            color: "green !important",
        }
    },
    notchedOutline: {},
    cssFocused: {},
};

const SearchTypes = ["Name", "Ingredients"].map(function (key) {
    return {label: key, value: key}
});

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
        const {classes} = this.props;
        return (
            <ThemeProvider theme={theme}>
                <form className={classes.container} action="javascript:void(-1)" noValidate autoComplete="off">
                    <TextField
                        id="outlined-select-search"
                        select
                        label="Search By"
                        value={this.props.searchType}
                        onChange={event => this.props.updateInput(["searchType", event.target.value])}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}>
                        {SearchTypes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {this.getSearchBar()}
                </form>
            </ThemeProvider>
        )
    }

    getSearchBar() {
        const {classes} = this.props;
        if (this.props.searchType === "Ingredients") {
            if (this.props.searchBar != ""){this.props.updateInput(["searchBar", ""])}
            return (
                <ChipInput
                    id="outlined-simple-start-adornment"
                    className={classes.searchIngredients}
                    placeholder="Search Ingredients"
                    fullWidth
                    variant="outlined"
                    defaultValue={[]}
                    onChange={chips => this.props.updateInput(["chipSearch", chips])}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        }
                    }}/>)
        } else {
            if (this.props.chipSearch != ""){this.props.updateInput(["chipSearch", []])}
            return (
                <TextField
                    id="outlined-simple-start-adornment"
                    className={classes.textField}
                    placeholder="Find a Recipe"
                    fullWidth
                    variant="outlined"
                    value={this.props.searchBar}
                    onChange={event => this.props.updateInput(["searchBar", event.target.value])}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        }
                    }}/>
            )
        }
    }

}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {searchType: state.inputReducer.searchType,
            chipSearch: state.inputReducer.chipSearch,
            searchBar: state.inputReducer.searchBar};
};

export default compose(withStyles(styles), connect(mapStateToProps, {updateInput}))(SearchBar);
