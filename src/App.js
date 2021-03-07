import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import NewUser from "./components/new-user.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import EnhancedTable from "./components/users/users-table-component";
import UserDetail from "./components/user-details/users-details-component"
import SwaggerUI from "./components/swagger/swagger-component";
import Language from "./components/dicionaries/language-dict-component";
import LanguageDetails from "./components/dicionaries/language-details"
import Qualifications from "./components/dicionaries/qualifications-dict-component";
import QualificationDetails from "./components/dicionaries/qualification-details"
import QualificationCreate from "./components/dicionaries/qualification-create"
import LanguageCreate from "./components/dicionaries/language.create";
import Files from "./components/dicionaries/file-dict-component";
import FileCreate from "./components/dicionaries/file.create";
import FileDetails from "./components/dicionaries/file-details"
import PageNotFound from "./components/PageNotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorContent: false,
      showAdminContent: false,
      currentUser: undefined,
      showUserContent: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserContent: user.roles.includes("ROLE_USER"),
        showModeratorContent: user.roles.includes("ROLE_MODERATOR"),
        showAdminContent: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorContent, showAdminContent, showUserContent} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
          <Link to={"/"} className="navbar-brand">
            Archivizer
          </Link>
          <div className="navbar-nav mr-auto">
            { showAdminContent && (
                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    Users
                  </Link>
                </li>
            )}

            { showAdminContent && (
                <li className="nav-item">
                  <Link to={"/swagger"} className="nav-link">
                    Swagger
                  </Link>
                </li>
            )}
            { showUserContent && (
                <li className="nav-item">
                  <Link to={"/languages"} className="nav-link">
                    Languages
                  </Link>
                </li>
            )}
            { showUserContent && (
                <li className="nav-item">
                  <Link to={"/qualifications"} className="nav-link">
                    Qualifications
                  </Link>
                </li>
            )}
            { showUserContent && (
                <li className="nav-item">
                  <Link to={"/files"} className="nav-link">
                    Files
                  </Link>
                </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

        </nav>
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/newUser" component={NewUser} />
            <Route exact path="/users/:id" component={(routerProps) => <UserDetail id={routerProps.match.params.id}
                                                                                   showUserContent = {this.state.showUserContent}
                                                                                   showModeratorContent = {this.state.showModeratorContent}
                                                                                   showAdminContent = {this.state.showAdminContent}
                                                                      />}/>
            <Route exact path="/languages/:id" component={(routerProps) => <LanguageDetails id={routerProps.match.params.id}
                                                                                            showUserContent = {this.state.showUserContent}
                                                                                            showModeratorContent = {this.state.showModeratorContent}
                                                                                            showAdminContent = {this.state.showAdminContent}/>}/>
            <Route exact path="/qualification/:id" component={(routerProps) => <QualificationDetails id={routerProps.match.params.id}/>}/>
            <Route exact path="/qualification/" component={QualificationCreate}/>
            <Route exact path="/language/" component={LanguageCreate}/>
            <Route exact path="/users" component={EnhancedTable} />
            <Route exact path="/swagger" component={SwaggerUI} />
            <Route exact path="/languages" component={() =><Language
                   showUserContent = {this.state.showUserContent}
                   showModeratorContent = {this.state.showModeratorContent}
                   showAdminContent = {this.state.showAdminContent}/> }/>
            <Route exact path="/qualifications" component={Qualifications} />
            <Route exact path="/files" component={Files} />
            <Route exact path="/file" component={FileCreate} />
            <Route exact path="/file/:id" component={(routerProps) => <FileDetails id={routerProps.match.params.id}/>}/>
            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </div>

    );
  }
}

export default App;
