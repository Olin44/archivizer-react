import React, {Component} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class BooleanFormFieldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error : false,
            errorMessage: "",
            data : ""
        }
    }

    handleChange(e){
        this.sendBackData(e.target.checked);
        this.props.validationSchema
            .validate(e.target.checked)
            .then(this.setState({error : false, errorMessage: ""}))
            .catch((err) => this.setState({error : true, errorMessage: err.errors})
            );

    }

    sendBackData = (value) => {
        this.props.parentCallback(value);
    }

    render() {
        return(
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.props.checked}
                        name={this.props.name}
                        color="primary"
                        disabled={this.props.disabled}
                        onClick={event=>{this.handleChange(event)}}
                    />
                }
                label={this.props.label}
            />
        )
    }
}