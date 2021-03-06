import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
        width: "80%",
        height: "80%",
    },
});

const DialogTitle = withStyles(styles)(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h5">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default class CommonDialog extends Component {
    render() {
        return (
            <div>
                <Dialog
                    id="printable-section"
                    fullWidth
                    onClose={() => this.props.closeDialog}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.dialogOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={this.props.closeDialog}>
                        {this.props.dialogTitle}
                    </DialogTitle>
                    <DialogContent dividers>
                        {this.props.dialogContent}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
