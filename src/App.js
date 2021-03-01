import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import NewUser from "./components/new-user.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showUserBoard: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.roles.includes("ROLE_USER"),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showUserBoard} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
          <Link to={"/"} className="navbar-brand">
            Archivizer
          </Link>
          <div className="navbar-nav mr-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            { (
                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    Users
                  </Link>
                </li>
            )}

            { (
                <li className="nav-item">
                  <Link to={"/swagger"} className="nav-link">
                    Swagger
                  </Link>
                </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            { (
                <li className="nav-item">
                  <Link to={"/languages"} className="nav-link">
                    Languages
                  </Link>
                </li>
            )}
            { (
                <li className="nav-item">
                  <Link to={"/qualifications"} className="nav-link">
                    Qualifications
                  </Link>
                </li>
            )}
            { (
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
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/newUser" component={NewUser} />
            <Route exact path="/users/:id" component={(routerProps) => <UserDetail id={routerProps.match.params.id}/>}/>
            <Route exact path="/languages/:id" component={(routerProps) => <LanguageDetails id={routerProps.match.params.id}/>}/>
            <Route exact path="/qualification/:id" component={(routerProps) => <QualificationDetails id={routerProps.match.params.id}/>}/>
            <Route exact path="/qualification/" component={QualificationCreate}/>
            <Route exact path="/language/" component={LanguageCreate}/>
            <Route exact path="/users" component={EnhancedTable} />
            <Route exact path="/swagger" component={SwaggerUI} />
            <Route exact path="/languages" component={Language} />
            <Route exact path="/qualifications" component={Qualifications} />
            <Route exact path="/files" component={Files} />
            <Route exact path="/file" component={FileCreate} />



          </Switch>
        </div>
      </div>

    );
  }
}

export default App;
