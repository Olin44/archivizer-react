import React, {Component} from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
          });
        }
    );
  }

  render() {
    return (
        <main role="main" className="text-center col-xs-12">
            <h1 className="cover-heading">Archivizer</h1>
            <p className="lead">Data archiving system for small and medium-sized companies.
            </p>
        </main>
    );
  }
}
