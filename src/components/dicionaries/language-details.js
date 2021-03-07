import React, {Component} from "react";

import Grid from "@material-ui/core/Grid";
import CustomFormFieldComponent from "../filelds/custom-form-field-component";
import * as yup from "yup";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from "../utils/breadcrumbs-component";
import HomeIcon from '@material-ui/icons/Home';
import LanguageService from "../../services/language.service";
import LanguageIcon from '@material-ui/icons/Language';

export default class UsersDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            usersDetails: null,
            loaded: false,
            roles: [],
            validationSchema: {
                name: yup.string().required(),
                code: yup.string().required()
                    .matches(/^[a-zA-Z]+$/, "must be only letters")
                    .min(3, 'must be exactly 3 digits')
                    .max(3, 'must be exactly 3 digits')
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
                    href:"/languages",
                    name:"Languages",
                    icon:<LanguageIcon/>
                }
            ],
        };
    }

    componentDidMount() {
        this.fetchObjectFromApi();
    }

    async fetchObjectFromApi(){
        LanguageService.getLanguage(this.props.id)
            .then( response => {console.log(response.data); this.setState({usersDetails: response.data, loaded: true})})
    }

    nameOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, name: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    codeOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, code: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    handleUpdateClick(e) {
        e.preventDefault();
        const body = {code: this.state.usersDetails['code'], name: this.state.usersDetails['name']};
        LanguageService
            .updateLanguage(this.state.usersDetails['id'], body)
            .then(r => alert('User update!'))
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
                                              actualSiteName={"Edit language details"}
                                              actualSiteIcon={<HomeIcon/>}/>
                        <Grid alignItems={'center'} container direction="column" style={{ backgroundColor: '#f2f2f2' }}>
                            <Grid item xs={12} alignItems={'center'} >
                                <Typography variant="subtitle1" gutterBottom style={{ color:'#266eb6'}}>
                                    Information about language
                                </Typography>
                                <Divider/>
                                <CustomFormFieldComponent name={'code'} label={'Code'}
                                                          required={true} defaultValue={this.state.usersDetails['code']}
                                                          validationSchema = { this.state.validationSchema.code}
                                                          parentCallback = {this.codeOnChange}/>

                                <CustomFormFieldComponent name={'name'} label={'Name'}
                                                          required={true} defaultValue={this.state.usersDetails['name']}
                                                          validationSchema = { this.state.validationSchema.name}
                                                          parentCallback = {this.nameOnChange}
                                />
                            </Grid>
                        </Grid>
                        <div onClick={() => console.log('speed A')} style={this.state.floatingButtonStyle}>
                            <Fab color="secondary" aria-label="edit" style={this.state.floatingButtonStyle} onClick={this.handleUpdateClick.bind(this)}>
                                <EditIcon />
                            </Fab>
                        </div>

                    </div>
                ) : null}
            </div>
        );
    }
}
