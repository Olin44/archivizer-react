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
import AssignmentIcon from '@material-ui/icons/Assignment';
import LanguageService from "../../services/language.service";
import BooleanFormFieldComponent from "../filelds/boolean-form-field-component";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import DropdowmenuComponent from "../filelds/dropdowmenu-component";
import FilesService from "../../services/files-service";
import UsersService from "../../services/users.service";

export default class LanguageCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            loaded: false,
            usersDetails: {
                code: null,
                name: null,
            },
            users : [],
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
                    href:"/files",
                    name:"Files",
                    icon:<InsertDriveFileIcon/>
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

    createData(id, nameAndSurname) {
        return { id, nameAndSurname};
    }

    mapDataFromApiToRows(response){
        let tempRow;
        let tempRows = [];
        for(let i = 0; i < response.length; i++)
        {
            tempRow = this.createData(response[i]['id'], response[i]['nameAndSurname'])
            tempRows.push(tempRow);
        }
        console.log(this.state);
        return tempRows;
    }

    fetchUsersWithoutPagination(){
        UsersService.getUsersWithoutPagination()
            .then(response => {console.log(response.data); this.setState({users: this.mapDataFromApiToRows(response.data), loaded:true})});
    }

    componentDidMount(){
        this.fetchUsersWithoutPagination();
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
                                              actualSiteName={"Create file"}
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
                                <DropdowmenuComponent options = {this.state.users}
                                                      parentCallback = {this.nameOnChange}
                                                      label={'Creator'}/>
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
