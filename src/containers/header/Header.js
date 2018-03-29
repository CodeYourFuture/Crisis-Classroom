import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div >
        <nav className="App-header sticky-top py-1">
          <div classname="App-logo">
          
        <img alt="Logo crisis classroom" height="110" src="https://www.crisisclassroom.com/img/crisis-logo.svg" />
          </div>
          <div>
            <a href="https://www.facebook.com/CrisisClassroom/" className="nav-facebook">
            <img src="https://www.crisisclassroom.com/img/icons/social/black/fbf.svg" alt="facebook" height="35" />
            </a>
            <a href="https://www.instagram.com/crisisclassroom/">
            <img src="https://www.crisisclassroom.com/img/icons/social/black/igf.svg" alt="instagram" height="35" />
            </a>
            <a href="https://mobile.twitter.com/Crisis_Classrm">
            <img src="https://www.crisisclassroom.com/img/icons/social/black/twf.svg" alt="tweeter" height="35" />
            </a>
          </div>
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
            <a className="py-2 d-none d-md-inline-block" href="https://www.crisisclassroom.com/about">
              About
            </a>
            <a className="py-2 d-none d-md-inline-block" href="https://www.crisisclassroom.com/contact">
              Contact
            </a>
            <form className="navbar-form navbar-left" action="/action_page.php">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" name="search" />
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </nav>



      </div>

    );
  }
}

export default Header;
