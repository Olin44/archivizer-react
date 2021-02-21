import React, {Component} from "react";
import UsersService from "../../services/users.service";
import CheckRolesComponent from "./check-roles-component";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CustomFormFieldComponent from "../filelds/custom-form-field-component";
import * as yup from "yup";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import DateFormFieldComponent from "../filelds/date-form-field-component";
import BooleanFormFieldComponent from "../filelds/boolean-form-field-component";
import BreadcrumbsComponent from "../utils/breadcrumbs-component";
import {PeopleOutline} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import UserService from "../../services/user.service";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));


export default class UsersDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            usersDetails: null,
            loaded: false,
            roles: [],
            validationSchema: {
                login: yup.string().required(),
                name: yup.string().required(),
                surname: yup.string().required(),
                email: yup.string().email().required(),
                pesel: yup.string().matches(/^[0-9]+$/, "must be only digits")
                    .min(9, 'must be exactly 9 digits')
                    .max(9, 'must be exactly 9 digits')
                },

            floatingButtonStyle: {
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
            },
            subSites: [
                    {
                        href:"/users",
                        name:"Users",
                        icon:<PeopleOutline/>
                    }
                ],
        };
        // const handleNameChange = this.handleNameChange.bind(this)

    }

    componentDidMount() {
        this.fetchUserDetailsDataFromApi();
    }

    async fetchUserDetailsDataFromApi(){
        UsersService.getUsersDetails(this.props.id)
            .then( response => {console.log(response.data); this.setState({usersDetails: response.data, loaded: true})})
    }

    nameOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, name: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    surnameOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, surname: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    loginOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, login: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    emailOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, email: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    isActiveOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, isActive: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    peselOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, pesel: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    handleUpdateClick(e) {
        e.preventDefault();
        UserService
            .updateUser(this.state.usersDetails['id'], this.state.usersDetails)
            .then(r => alert('User deleted!'))
            .catch(error => {if( error.response ){
                alert(error.response.data);
                console.log(error.response.data);// => the response payload
        }});
    }

    render() {
        return (
            <div>
                {this.state.loaded ? (
                    <div style={{ minHeight: '90vh'}}>
                        <BreadcrumbsComponent subSites={this.state.subSites}
                                              actualSiteName={"Edit users details"}
                                              actualSiteIcon={<HomeIcon/>}/>
                            <Grid alignItems={'center'} container direction="column" style={{ backgroundColor: '#f2f2f2' }}>
                                <Grid item xs={12} alignItems={'center'} >
                                <Typography variant="subtitle1" gutterBottom style={{ color:'#266eb6'}}>
                                User account information
                                </Typography>
                                <Divider/>
                                <CustomFormFieldComponent name={'login'} label={'Login'}
                                                          required={true} defaultValue={this.state.usersDetails['login']}
                                                          validationSchema = { this.state.validationSchema.login}
                                                          parentCallback = {this.loginOnChange}/>

                                <CustomFormFieldComponent name={'email'} label={'Email'}
                                                          required={true} defaultValue={this.state.usersDetails['email']}
                                                          validationSchema = { this.state.validationSchema.email}
                                                          parentCallback = {this.emailOnChange}/>
                                <Divider />
                                <BooleanFormFieldComponent name={'isActive'}
                                                           label={"Is active user?"}
                                                           checked ={this.state.usersDetails['active']}
                                                           disabled={true}/>
                                <Typography variant="subtitle1" gutterBottom style={{ color:'#266eb6'}}>
                                    User personal information
                                </Typography>
                                    <Divider/>
                                    <CustomFormFieldComponent name={'name'} label={'Name'}
                                                              required={true} defaultValue={this.state.usersDetails['name']}
                                                              validationSchema = { this.state.validationSchema.name}
                                                              parentCallback = {this.nameOnChange}/>

                                <CustomFormFieldComponent name={'surname'} label={'Surname'}
                                                          required={true} defaultValue={this.state.usersDetails['surname']}
                                                          validationSchema = { this.state.validationSchema.surname}
                                                          parentCallback = {this.surnameOnChange}/>

                                 <CustomFormFieldComponent name={'pesel'} label={'Pesel'}
                                                           required={true} defaultValue={this.state.usersDetails['pesel']}
                                                           validationSchema = { this.state.validationSchema.pesel}
                                                           parentCallback = {this.peselOnChange}/>

                                <Typography variant="subtitle1" gutterBottom style={{ color:'#266eb6'}}>
                                    User account metadata
                                </Typography>
                                    <DateFormFieldComponent id={'creationDate'}
                                                            label={'Creation date'}
                                                            defaultValue={this.state.usersDetails['creationDate']} disabled={true}/>
                                    <DateFormFieldComponent id={'editDate'}
                                                            label={'Last edit date'}
                                                            defaultValue={this.state.usersDetails['editDate']} disabled={true}/>
                            <Divider />
                                    <Typography variant="subtitle1" gutterBottom style={{ color:'#266eb6'}}>
                                        User roles
                                        <Divider />
                                    </Typography>
                                <CheckRolesComponent userRoles={this.state.usersDetails.roles}/>
                                </Grid>
                            </Grid>
                        <Fab color="secondary" aria-label="edit" style={this.state.floatingButtonStyle} onClick={this.handleUpdateClick.bind(this)}>
                            <EditIcon />
                        </Fab>
                    </div>
                ) : null}
            </div>
        );
    }
}
