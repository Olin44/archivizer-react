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
import LanguagesService from "../../services/languages.servive";
import BooleanFormFieldComponent from "../filelds/boolean-form-field-component";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import DropdowmenuComponent from "../filelds/dropdowmenu-component";
import FilesService from "../../services/files-service";
import UsersService from "../../services/users.service";
import  QualificationService from "../../services/qualifications.service"
import DropzoneDialogExample from "../filelds/dropzone-component";
import MultiSelectionExtension from "../filelds/multiselectect-extension-component";
import MultichipselectComponent from "../filelds/multichipselect-component";
import RolesService from "../../services/roles.service"
import FileService from "../../services/file-service";
import Button from "@material-ui/core/Button";
import { triggerBase64Download } from 'react-base64-downloader';

export default class LanguageCreate extends Component {
    constructor(props) {
        super(props);
        this.imageOnSave = this.imageOnSave.bind(this);
        this.state = {
            id: props.id,
            qualificationLoaded : false,
            rolesLoaded : false,
            languagesLoaded : false,
            usersLoaded : false,
            loaded: false,
            usersDetails: {
                code: null,
                name: null,
            },
            qualifications : [],
            languages : [],
            roles : [],
            selectedRoles : [],
            canBeDeleted : false,
            validationSchema: {
                format: yup.string().required(),
                type: yup.string().required(),
                title: yup.string().required(),
                description : yup.string().required()
            },
            floatingButtonStyle: {
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
            },
            fileAsBase64 : '',
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


    fetchQualificationWithoutPagination(){
        QualificationService.getQualificationWithoutPagination()
            .then(response => {console.log(response.data); this.setState({qualifications: response.data, qualificationLoaded:true})});
    }

    fetchLanguagesWithoutPagination(){
        LanguagesService.getLanguagesWithoutPagination()
            .then(response => {console.log(response.data); this.setState({languages: response.data, languagesLoaded:true})});
    }

    fetchRolesFromApi(){
        RolesService.getRoles()
            .then(response => {console.log(response.data); this.setState({roles: response.data.roles, rolesLoaded:true})});
    }

    fetchUsersFromApi() {
        UsersService.getUsersWithoutPagination()
            .then(response => {console.log(response.data);
                this.setState({users: response.data, usersLoaded:true})
            });

    }

    componentDidMount(){
        this.fetchObjectFromApi();
        this.fetchQualificationWithoutPagination();
        this.fetchLanguagesWithoutPagination();
        this.fetchRolesFromApi();
        this.fetchUsersFromApi();
    }

    fetchObjectFromApi(){
        FileService.get(this.props.id).then(response => {console.log(response.data); this.setState({fileWithMetadata : response.data, loaded: true })})
    }

    nameOnChange = (childData) => {
        let copyFoo = { ...this.state.usersDetails, name: childData };
        this.setState({usersDetails : copyFoo}, function () {
            console.log(this.state.usersDetails);
        });
    }

    languageOnChange = (childData) => {
        this.setState({language : childData}, function () {
            console.log(this.state);
        });
    }

    qualificationOnChange = (childData) => {
        this.setState({qualification : childData}, function () {
            console.log(this.state);
        });
    }

    rolesOnChange = (childData) => {
        this.setState({selectedRoles : childData}, function () {
            console.log(this.state);
        });
    }

    descriptionOnChange = (childData) => {
        this.setState({description : childData}, function () {
            console.log(this.state);
        });
    }

    typeOnChange = (childData) => {
        this.setState({type : childData}, function () {
            console.log(this.state);
        });
    }

    formatOnChange = (childData) => {
        this.setState({format: childData}, function () {
            console.log(this.state);
        });
    }

    usersOnChange = (childData) => {
        this.setState({selectedUsers : childData}, function () {
            console.log(this.state);
        });
    }

    imageOnSave = (childData) => {
        const reader = new FileReader();
        this.state.file =  childData;
        this.state.format = childData.name.split('.')[1];
        this.state.type = childData.type;
        this.state.title = childData.name.split('.')[0];
        console.log(this.state);
        reader.readAsDataURL(childData);
        reader.onload = () => this.setState({fileAsBase64 : reader.result.split(';base64,')[1]});
    }

    handleUpdateClick(e) {
        e.preventDefault();

        const body = {
            creatorId: JSON.parse(localStorage.getItem('user'))['id'],
            format: this.state.format,
            type: this.state.type,
            title: this.state.title,
            description: this.state.description,
            file :this.state.fileAsBase64,
            qualificationId: this.state.qualification['id'],
            languageId: this.state.language['id'],
            rolesWithAccessId: this.state.selectedRoles.map(a => a.id),
            usersWithAccess: this.state.selectedUsers.map(a => a.id)
        }
        // const formData = new FormData();
        // formData.append('file', this.state.file);
        // formData.append('format', this.state.format);
        // formData.append('qualificationId', this.state.qualification['id']);
        // formData.append('rolesWithAccessId', JSON.stringify(this.state.selectedRoles.map(a => a.id)));
        // formData.append('usersWithAccess', JSON.stringify(this.state.selectedUsers.map(a => a.id)));
        // formData.append('title', this.state.title);
        // formData.append('type', this.state.type);
        // formData.append('languageId', this.state.language['id']);
        // formData.append('creatorId', JSON.parse(localStorage.getItem('user'))['id']);
        // formData.append('description', this.state.description);
        FileService
            .create(body)
            .then(r => alert('File created!'))
            .catch(error => {if( error.response ){
                alert(error.response.data);
                console.log(error.response.data);// => the response payload
            }});
    }


    downloadFile = (file) =>{
        const type = this.state.fileWithMetadata.type;
        const title = this.state.fileWithMetadata.title;
        const linkSource ="data:" + type + ";base64," + file;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = title;
        downloadLink.click();
    }

    render() {
        return (
            <div>
                {this.state.loaded && this.state.users != null? (
                    <div style={{ minHeight: '90vh'}}>
                        <BreadcrumbsComponent subSites={this.state.subSites}
                                              actualSiteName={"Create file"}
                                              actualSiteIcon={<HomeIcon/>}/>
                        <Grid alignItems={'center'} container direction="column" style={{ backgroundColor: '#f2f2f2' }}>
                            <Grid item xs={12} alignItems={'center'} >
                                {   this.state.qualificationLoaded === true &&
                                this.state.rolesLoaded === true
                                && this.state.languagesLoaded === true &&
                                    this.state.usersLoaded === true && this.state.loaded === true ? (<div>
                                    <Button variant="contained" color="primary" onClick={() => this.downloadFile(this.state.fileWithMetadata.file)}>
                                        Download file </Button>
                                    <Typography variant="subtitle1" gutterBottom style={{ color:'#266eb6'}}>
                                        Change file
                                    </Typography>
                                    <DropzoneDialogExample parentCallback = {this.imageOnSave} buttonText = {"Change file"}/></div>) : null}
                                <Divider/>
                                    <div>
                                        <CustomFormFieldComponent name={'title'} label={'Title'}
                                                                  required={true} defaultValue={this.state.fileWithMetadata['title']}
                                                                  validationSchema = { this.state.validationSchema.title}
                                                                  parentCallback = {this.nameOnChange}
                                        />
                                        <CustomFormFieldComponent name={'format'} label={'Format'}
                                                                  required={false} defaultValue={this.state.fileWithMetadata.format}
                                                                  validationSchema = { this.state.validationSchema.format}
                                                                  parentCallback = {this.formatOnChange}
                                                                  disabled = 'disabled'
                                        />
                                        <CustomFormFieldComponent name={'type'} label={'Type'}
                                                                  required={true} defaultValue={this.state.fileWithMetadata.type}
                                                                  validationSchema = { this.state.validationSchema.type}
                                                                  parentCallback = {this.typeOnChange}
                                                                  disabled = 'disabled'
                                        />
                                        <CustomFormFieldComponent name={'description'} label={'Description'}
                                                                  required={true} defaultValue={this.state.fileWithMetadata.description}
                                                                  validationSchema = { this.state.validationSchema.description}
                                                                  parentCallback = {this.descriptionOnChange}

                                        />
                                        <DropdowmenuComponent options = {this.state.qualifications}
                                                              parentCallback = {this.qualificationOnChange}
                                                              label={'Qualification'}
                                                              optionLabel = {(option) => option.type}/>
                                        <DropdowmenuComponent options = {this.state.languages}
                                                              parentCallback = {this.languageOnChange}
                                                              label={'Language'}
                                                              optionLabel = {(option) => option.name}/>
                                        <MultichipselectComponent parentCallback = {this.rolesOnChange}
                                                                  selected = {this.state.fileWithMetadata.rolesWithAccess.roles}
                                                                  data = {this.state.roles}
                                                                  textField = 'name'
                                                                  label = 'Select roles'/>
                                        <MultichipselectComponent parentCallback = {this.usersOnChange}
                                                                  selected = {this.state.fileWithMetadata.usersWithAccess}
                                                                  data = {this.state.users}
                                                                  textField = 'nameAndSurname'
                                                                  label = 'Select users'/>
                                    </div>
                            </Grid>
                        </Grid>
                        <div onClick={() => console.log('speed A')} style={this.state.floatingButtonStyle}>
                            <Fab color="secondary" aria-label="edit" style={this.state.floatingButtonStyle} onClick={this.handleUpdateClick.bind(this)}>
                                <EditIcon />
                            </Fab>
                        </div>

                    </div>
                ) : <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /></div>}
            </div>
        );
    }
}
