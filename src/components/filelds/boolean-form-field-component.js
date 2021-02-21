import React, {Component} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class BooleanFormFieldComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.props.checked}
                        // onChange={handleChange}
                        name={this.props.name}
                        color="primary"
                        disabled={this.props.disabled}
                    />
                }
                label={this.props.label}
            />
        )
    }
}