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
import LanguageIcon from '@material-ui/icons/Language';
import LanguageService from "../../services/language.service";

export default class LanguageCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            loaded: true,
            usersDetails: {
                code: null,
                name: null,
            },
            canBeDeleted : false,
            roles: [],
            validationSchema: {
                code: yup.string().required(),
                name: yup.string(),
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

    codeOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, code: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    nameOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, name: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    handleUpdateClick(e) {
        e.preventDefault();
        const body = {name: this.state.usersDetails['name'],
            code: this.state.usersDetails['code'],
        };
        LanguageService
            .create(body)
            .then(r => alert('Qualification created!'))
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
                                <CustomFormFieldComponent name={'code'} label={'code'}
                                                          required={false} defaultValue={''}
                                                          validationSchema = { this.state.validationSchema.code}
                                                          parentCallback = {this.codeOnChange}
                                />
                                <CustomFormFieldComponent name={'name'} label={'name'}
                                                          required={true} defaultValue={''}
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
