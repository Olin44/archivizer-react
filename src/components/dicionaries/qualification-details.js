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
import AssignmentIcon from '@material-ui/icons/Assignment';
import QualificationService from "../../services/qualifications.service";
import BooleanFormFieldComponent from "../filelds/boolean-form-field-component";

export default class UsersDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            usersDetails: null,
            loaded: false,
            roles: [],
            validationSchema: {
                type: yup.string().required(),
                description: yup.string(),
                canBeDeleted : yup.boolean(),
                day : yup.number().integer().min(0),
                month : yup.number().integer().min(0),
                year : yup.number().integer().min(0)

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
                    href:"/qualifications",
                    name:"Qualifications",
                    icon:<AssignmentIcon/>
                }
            ],
        };
    }

    componentDidMount() {
        this.fetchObjectFromApi();
    }

    async fetchObjectFromApi(){
        QualificationService.get(this.props.id)
            .then( response => {console.log(response.data.archivizeAfterResponse); this.setState({usersDetails: response.data, loaded: true, archivizeAfter: response.data.archivizeAfterResponse,})})
    }

    typeOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, type: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    descriptionOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, description: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    dayOnChange = (childData) => {
        console.log(childData);
        let copyFoo = { ...this.state.archivizeAfter, day: childData };
        this.setState({archivizeAfter : copyFoo}, function () {
            console.log(this.state);
        });
    }

    monthOnChange = (childData) => {
        console.log(childData);
        let copyFoo = { ...this.state.archivizeAfter, 'month': childData };
        this.setState({archivizeAfter : copyFoo}, function () {
            console.log(this.state);
        });
    }

    yearOnChange = (childData) => {
        console.log(childData);
        let copyFoo = { ...this.state.archivizeAfter, year: childData };
        this.setState({archivizeAfter : copyFoo}, function () {
            console.log(this.state);
        });
    }

    canBeDeletedOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, canBeDeleted: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    handleUpdateClick(e) {
        e.preventDefault();
        let archivizeAfterRequest =  null;
        if(this.state.usersDetails['canBeDeleted']){
            archivizeAfterRequest = {day : this.state.archivizeAfter['day'],
                month : this.state.archivizeAfter['month'],
                year : this.state.archivizeAfter['year']
            }
        }
        const body = {type: this.state.usersDetails['type'],
            description: this.state.usersDetails['description'],
            archivizeAfterRequest : archivizeAfterRequest,
            canBeDeleted : this.state.usersDetails['canBeDeleted']
        };
        QualificationService
            .update(this.state.usersDetails['id'], body)
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
                                <CustomFormFieldComponent name={'description'} label={'Description'}
                                                          required={false} defaultValue={this.state.usersDetails['description']}
                                                          validationSchema = { this.state.validationSchema.description}
                                                          parentCallback = {this.descriptionOnChange}
                                />
                                <CustomFormFieldComponent name={'type'} label={'type'}
                                                          required={true} defaultValue={this.state.usersDetails['type']}
                                                          validationSchema = { this.state.validationSchema.type}
                                                          parentCallback = {this.typeOnChange}
                                />
                                <BooleanFormFieldComponent name={'canBeDeleted'}
                                                           label={"Can be deleted?"}
                                                           checked ={this.state.usersDetails['canBeDeleted']}
                                                           disabled={false}
                                                           validationSchema = { this.state.validationSchema.canBeDeleted}
                                                           parentCallback = {this.canBeDeletedOnChange}
                                />
                                {this.state.usersDetails['canBeDeleted'] ? (
                                    <div>
                                Archivizer after(time after which the file will be deleted)
                                <CustomFormFieldComponent name={'day'} label={'day'}
                                                          required={true} defaultValue={this.state.archivizeAfter['day']}
                                                          validationSchema = { this.state.validationSchema.day}
                                                          parentCallback = {this.dayOnChange}
                                />
                                <CustomFormFieldComponent name={'month'} label={'month'}
                                                          required={true} defaultValue={this.state.archivizeAfter['month']}
                                                          validationSchema = { this.state.validationSchema.month}
                                                          parentCallback = {this.monthOnChange}
                                />
                                <CustomFormFieldComponent name={'year'} label={'year'}
                                                          required={true} defaultValue={this.state.archivizeAfter['year']}
                                                          validationSchema = { this.state.validationSchema.year}
                                                          parentCallback = {this.yearOnChange}
                                />
                                    </div>) : null}
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
