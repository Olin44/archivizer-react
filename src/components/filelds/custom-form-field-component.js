import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {Component} from "react";
import * as yup from "yup";

export default class CustomFormFieldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error : false,
            errorMessage: "",
            data : ""
        }
    }

    handleChange(event){
        this.sendBackData(event.target.value);
        this.props.validationSchema
            .validate(event.target.value)
            .then(this.setState({error : false, errorMessage: ""}))
            .catch((err) => this.setState({error : true, errorMessage: err.errors})
        );

    }

    sendBackData = (value) => {
        this.props.parentCallback(value);
    }

    render() {
        return (
            <FormControl margin='normal' fullWidth variant={'outlined'} required={this.props.required}>
                <Grid item xs={8} >
                    <InputLabel htmlFor={this.props.name + "-input-label"}>{this.props.label}</InputLabel>
                    <Input id={this.props.name + "-input"}
                           error={this.state.error}
                           defaultValue={this.props.defaultValue}
                           placeholder={this.props.defaultValue}
                           onChange={event=>{this.handleChange(event)}}
                           variant={'outlined'}
                    />
                    {this.state.error ? (
                        <FormHelperText id={this.props.name + "helper-text"}
                                        error={this.state.error} >
                                        {this.state.errorMessage}
                        </FormHelperText>
                        ) : null}
                </Grid>
            </FormControl>
        )
    }
}