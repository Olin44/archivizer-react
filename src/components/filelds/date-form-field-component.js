
import Grid from "@material-ui/core/Grid";
import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";

export default class DateFormFieldComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid item xs={8}>
                <TextField
                    id={this.props.id}
                    label={this.props.label}
                    type="datetime-local"
                    defaultValue={this.props.defaultValue}
                    disabled={this.props.disabled}
                />
            </Grid>)
    }
}