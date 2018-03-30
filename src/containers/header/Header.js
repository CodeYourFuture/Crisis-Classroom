import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="navbar-header">
        <nav className="App-header sticky-top py-1 navbar navbar-inverse">
          <div className="navbar-left">
            <img alt="Logo crisis classroom" height="110" src="https://www.crisisclassroom.com/img/crisis-logo.svg" />
          </div>
          <div className="navbar-header">
            <form className="navbar-form navbar-left search form-group" action="/action_page.php">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" name="search" />
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <div>
              <a href="https://www.facebook.com/CrisisClassroom/" className="nav-facebook">
                <img src="https://www.crisisclassroom.com/img/icons/social/black/fbf.svg" alt="facebook" height="35" />
              </a>
              <a href="https://www.instagram.com/crisisclassroom/" className="nav-instagram">
                <img src="https://www.crisisclassroom.com/img/icons/social/black/igf.svg" alt="instagram" height="35" />
              </a>
              <a href="https://mobile.twitter.com/Crisis_Classrm" className="nav-tweeter">
                <img src="https://www.crisisclassroom.com/img/icons/social/black/twf.svg" alt="tweeter" height="35" />
              </a>
            </div>
          </div>
          <div className="container-fluid">
            <div className="container d-flex flex-column flex-md-row justify-content-between">
              <a className="py-2 d-none d-md-inline-block" href="https://www.crisisclassroom.com/training">
                Training
            </a>
              <a className="py-2 d-none d-md-inline-block" href="https://www.crisisclassroom.com/teachers">
                Teachers
            </a>
              <a className="py-2 d-none d-md-inline-block" href="https://www.crisisclassroom.com/projects">
                Projects
            </a>
              <a className="py-2 d-none d-md-inline-block" href="https://www.crisisclassroom.com/news">
                News
            </a>

              <div classname="dropdown">
                <a className="py-2 d-none d-md-inline-block dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  About
            </a>
                <ul className="dropdown-menu">
                  <li><a href="https://www.crisisclassroom.com/about/meet-the-team">Meet the team</a></li>
                  <li><a href="https://www.crisisclassroom.com/about/what-we-do">What we do</a></li>
                  <li><a href="https://www.crisisclassroom.com/about/our-supporters">Our supporters</a></li>
                </ul>
              </div>
              <a className="py-2 d-none d-md-inline-block" href="https://www.crisisclassroom.com/contact">
                Contact
            </a>
            </div>

          </div>
        </nav>



      </div>

    );
  }
}

export default Header;
