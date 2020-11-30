import React, {Component} from "react";
import UserTableReactHooks from "./UserTableService";

export default class UserDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""}
        };
    }
    render() {
        return (<div>DUPA</div>);
    }
}
