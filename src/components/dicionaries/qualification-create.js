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
            loaded: true,
            usersDetails: {
                type: null,
                description: null,
                archivizeAfterRequest: null,
                canBeDeleted: null
            },
            canBeDeleted : false,
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
        // this.fetchObjectFromApi();
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
        let copyFoo = { ...this.state, canBeDeleted: childData };
        this.setState(copyFoo, function () {
            console.log(this.state);
        });
    }

    handleUpdateClick(e) {
        e.preventDefault();
        let archivizeAfterRequest =  null;
        if(this.state.canBeDeleted){
            archivizeAfterRequest = {day : this.state.archivizeAfter['day'],
                month : this.state.archivizeAfter['month'],
                year : this.state.archivizeAfter['year']
            }
        }
        const body = {type: this.state.usersDetails['type'],
            description: this.state.usersDetails['description'],
            archivizeAfterRequest : archivizeAfterRequest,
            canBeDeleted : this.state.canBeDeleted
        };
        QualificationService
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
                                <CustomFormFieldComponent name={'description'} label={'Description'}
                                                          required={false} defaultValue={''}
                                                          validationSchema = { this.state.validationSchema.description}
                                                          parentCallback = {this.descriptionOnChange}
                                />
                                <CustomFormFieldComponent name={'type'} label={'type'}
                                                          required={true} defaultValue={''}
                                                          validationSchema = { this.state.validationSchema.type}
                                                          parentCallback = {this.typeOnChange}
                                />
                                <BooleanFormFieldComponent name={'canBeDeleted'}
                                                           label={"Can be deleted?"}
                                                           checked ={this.state.canBeDeleted}
                                                           disabled={false}
                                                           validationSchema = { this.state.validationSchema.canBeDeleted}
                                                           parentCallback = {this.canBeDeletedOnChange}
                                />
                                {this.state.canBeDeleted ? (
                                    <div>
                                        Archivizer after(time after which the file will be deleted)
                                        <CustomFormFieldComponent name={'day'} label={'Day'}
                                                                  required={true} defaultValue={'Day'}
                                                                  validationSchema = { this.state.validationSchema.day}
                                                                  parentCallback = {this.dayOnChange}
                                        />
                                        <CustomFormFieldComponent name={'month'} label={'Month'}
                                                                  required={true} defaultValue={'Month'}
                                                                  validationSchema = { this.state.validationSchema.month}
                                                                  parentCallback = {this.monthOnChange}
                                        />
                                        <CustomFormFieldComponent name={'year'} label={'Year'}
                                                                  required={true} defaultValue={'Years'}
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
