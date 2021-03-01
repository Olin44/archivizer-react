import {Multiselect} from 'react-widgets'
import React, {Component} from "react";
import "react-widgets/dist/css/react-widgets.css";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class MultichipselectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
            selected : []
        };
    }

    sendBackData = (value) => {
        this.setState({ value })
        this.props.parentCallback(value);
    }

    render() {
        return (
            <div>
            <Grid item xs={8} >
                <h3>{this.props.label}</h3>
                <Multiselect
                data={this.state.data}
                onChange={value => this.sendBackData(value)}
                valueField='id'
                textField={this.props.textField}
                style={{ width: 300 }}
            />
            </Grid>
            </div>
        )
    }
}

