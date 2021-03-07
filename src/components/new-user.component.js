import React, {Component} from "react";

export default class NewUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Jeśli widzisz tę stronę administrator nie zaakceptował twojego konta. <br/>Poczekaj na
                        akceptację administratora i spróbuj zalogować się ponownie.</h3>
                </header>
            </div>
        );
    }
}