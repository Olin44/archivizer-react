import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h4>User profile</h4>
                    <hr/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form>
                      <div className="form-group row">
                        <label htmlFor="username" className="col-4 col-form-label">Login:</label>
                        <div className="col-8">
                          <input id="username" name="username" placeholder={currentUser.login} className="form-control here"
                                 required="required" type="text"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="name" className="col-4 col-form-label">First Name</label>
                        <div className="col-8">
                          <input id="name" name="name" placeholder="First Name" className="form-control here"
                                 type="text"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="lastname" className="col-4 col-form-label">Last Name</label>
                        <div className="col-8">
                          <input id="lastname" name="lastname" placeholder="Last Name" className="form-control here"
                                 type="text"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="text" className="col-4 col-form-label">Nick Name*</label>
                        <div className="col-8">
                          <input id="text" name="text" placeholder="Nick Name" className="form-control here"
                                 required="required" type="text"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="select" className="col-4 col-form-label">Display Name public as</label>
                        <div className="col-8">
                          <select id="select" name="select" className="custom-select">
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="email" className="col-4 col-form-label">Email*</label>
                        <div className="col-8">
                          <input id="email" name="email" placeholder="Email" className="form-control here"
                                 required="required" type="text"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="website" className="col-4 col-form-label">Website</label>
                        <div className="col-8">
                          <input id="website" name="website" placeholder="website" className="form-control here"
                                 type="text"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="publicinfo" className="col-4 col-form-label">Public Info</label>
                        <div className="col-8">
                          <textarea id="publicinfo" name="publicinfo" cols="40" rows="4" className="form-control"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="newpass" className="col-4 col-form-label">New Password</label>
                        <div className="col-8">
                          <input id="newpass" name="newpass" placeholder="New Password" className="form-control here"
                                 type="text"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-4 col-8">
                          <button name="submit" type="submit" className="btn btn-primary">Update My Profile</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div> : null}
      </div>
    );
  }
}
