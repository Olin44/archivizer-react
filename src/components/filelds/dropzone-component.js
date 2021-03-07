import React, {Component} from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: props.file != null ? props.file : []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
        this.props.parentCallback(files[0]);
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleOpen.bind(this)}>
                    {this.props.buttonText}
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint',
                        'application/msword', 'image/jpeg', 'image/png', 'image/bmp', 'application/pdf']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                    filesLimit = {1}
                    submitButtonText={"add file"}
                />
            </div>
        );
    }
}