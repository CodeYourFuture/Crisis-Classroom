import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg nav-1">
      <img alt="Logo crisis classroom" height="110" src="https://www.crisisclassroom.com/img/crisis-logo.svg" />
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item tm">
          <a className="py-2 d-none d-md-inline-block tr" href="https://www.crisisclassroom.com/training">
                 Training
          </a>
          </li>
          <li className="nav-item tm">
          <a className="py-2 d-none d-md-inline-block tr" href="https://www.crisisclassroom.com/teachers">
                 Teachers
             </a>
          </li>
          <li className="nav-item tm">
          <a className="py-2 d-none d-md-inline-block tr" href="https://www.crisisclassroom.com/projects">
                 Projects
             </a>
             </li>
          <li className="nav-item dropdown tm">
            
            <a className="py-2 d-none d-md-inline-block dropdown-toggle tr" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                         About
                   </a>
                       <ul className="dropdown-menu tr">
                         <li><a href="https://www.crisisclassroom.com/about/meet-the-team">Meet the team</a></li>
                         <li><a href="https://www.crisisclassroom.com/about/what-we-do">What we do</a></li>
                         <li><a href="https://www.crisisclassroom.com/about/our-supporters">Our supporters</a></li>
                       </ul>
          </li>
         
        </ul> 
        
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        
      </div>
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
    </nav>
      
    );
  }
}

export default Header;
