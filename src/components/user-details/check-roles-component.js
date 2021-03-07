import React, {Component} from "react";
import RolesService from "../../services/roles.service";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default class CheckRolesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            userRoles: props.userRoles
        }
    }

    componentDidMount() {
        this.fetRolesFromApi();
    }

    async fetRolesFromApi() {
        RolesService.getRoles().then(response => this.setState({roles: response.data['roles']}));
    }

    handleChange(event) {
        const role = this.state.userRoles.find(x => x.name === event.target.name);
        const roles = this.state.userRoles;
        if (role === undefined) {
            roles.push(this.state.roles.find(x => x.name === event.target.name));
            this.setState({userRoles: roles})
        } else {
            roles.splice(roles.indexOf(role), 1);
            this.setState({userRoles: roles})
        }
    }

    render() {
        return (
            <Grid container xs={12} >
                <FormControl required component="fieldset">
                    <FormGroup>
                        {
                            this.state.roles.map((role) => {
                            return <Grid item xs={4}><FormControlLabel
                                control=
                                    {<Checkbox
                                        checked={this.state.userRoles.findIndex(x => x.name === role.name) > -1}
                                        onChange={(event) => this.handleChange(event)}
                                        name={role.name}/>}
                                label={role.name}
                            />
                            </Grid>
                        })
                        }
                    </FormGroup>
                </FormControl>

            </Grid>
        );
    }
}