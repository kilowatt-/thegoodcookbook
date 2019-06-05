import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CommonDialog from './CommonDialog'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

class RecipeDetails extends Component {
  getDialogContent() {
    return (
      <Typography gutterBottom>
        {this.props.recipe.procedure}
      </Typography>
    );
  }

  getDialogActions() {
    return (
      <div></div>
    );
  }

  render() {
      return (
        <div>
          <CommonDialog
            closeDialog={this.props.closeDialog}
            dialogOpen={this.props.dialogOpen}
            dialogTitle={this.props.recipe.recipeName}
            dialogContent={this.getDialogContent()}
            dialogActions={this.getDialogActions()}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {recipe: state.detailedRecipe};
}

export default connect(mapStateToProps)(RecipeDetails);
