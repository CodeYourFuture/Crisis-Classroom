import React from "react";
import { Link } from "react-router-dom";
import HappyKids from "../../image/icons/happy-kids-clipart-transparent.png";

import "./style.css";

const HomePage = () => {
  return (
    <div className="getStart">
      <h1 className="welcome">Welcome to Crisis Classroom</h1>
      <img
        src={require("../../image/crisis.jpg")}
        alt="crisis"
        className="img-responsive crisis-image "
      />
      <h2 className="empower">
        EMPOWERMENT THROUGH EDUCATION FOR ALL REFUGEES
      </h2>
      <p>
        No matter who you are, how old you are or where in the world you are, we
        believe with all our hearts that education isn’t a privilege but a
        fundamental human right. We uphold this right, we fight for it and we
        enable it. Unconstrained by bricks and mortar, unconcerned by age limits
        our classrooms are open to everyone. More than just algebra and verbs,
        this is relearning life in another language. To ask for a loaf of bread,
        to make new friends, to talk to a doctor about your child. This is
        education that helps you take back control and regain a sense of self so
        that life can begin. BECOME AN INVESTOR, SUPPORTER OR AMPLIFIER OF OUR
        CROWDFUNDER TO SEND EDUCATION BACK ALONG THE REFUGEE ROUTES OF EUROPE
      </p>
      <a href="https://chuffed.org/project/crisis-classroom">
        https://chuffed.org/project/crisis-classroom
      </a>

      <div className="column">
        <img src={HappyKids} className="happy-kids" alt="kids" />
        <hr />
      </div>
      <button type="button" className="btn btn-primary btn-survey">
        <Link to="/survey">Survey</Link>
      </button>
      <hr />
      <div className="row">
        <div className="col-xs-12">
          <h1 className="text-center team-name">Latest Projects</h1>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <figure className="thumbnail">
                <div className="img-container ">
                  <a
                    href="https://www.crisisclassroom.com/projects/from-brighton-to-the-balkans"
                    className="link-6"
                  >
                    <img
                      src={require("../../image/archive/MelissaAlon.jpg")}
                      alt="From Brighton to the Balkans"
                      width="100%"
                      className=" img-responsive day"
                    />
                  </a>
                  <a
                    href="https://www.crisisclassroom.com/projects/from-brighton-to-the-balkans"
                    className="more-info"
                  >
                    MORE INFO
                  </a>
                </div>
                <figcaption className="caption text-center">
                  <h2 className="text-center text-uppercase">
                    <a href="https://www.crisisclassroom.com/projects/from-brighton-to-the-balkans">
                      From Brighton to the Balkans
                    </a>
                  </h2>
                  <p>
                    The European Tour is underway! The team are winding their
                    way&nbsp;back along the refugee route with our
                    brand-new&nbsp;mobile school, an inflatable classroom and a
                    store cupboard full of resources. Find out more about what
                    they’re up to here.
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="col-xs-12 col-sm-4">
              <figure className="thumbnail">
                <div className="img-container">
                  <a
                    href="https://www.crisisclassroom.com/projects/right-here-right-now"
                    className="link-6"
                  >
                    <img
                      src={require("../../image/archive/P1030037.JPG")}
                      alt="Right Here Right Now"
                      width="100%"
                      className="img-responsive day"
                    />
                  </a>
                  <a
                    href="https://www.crisisclassroom.com/projects/right-here-right-now"
                    className="more-info"
                  >
                    MORE INFO
                  </a>
                </div>
                <figcaption className="caption text-center">
                  <h2 className="text-center text-uppercase">
                    <a href="https://www.crisisclassroom.com/projects/right-here-right-now">
                      Right Here Right Now
                    </a>
                  </h2>
                  <p>
                    If you’re local and you’d like&nbsp;to do something&nbsp;to
                    help others learn the skills and knowledge they need to get
                    to the next step on their journey, we’d love to hear from
                    you.
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="col-xs-12 col-sm-4">
              <figure className="thumbnail">
                <div className="img-container">
                  <a
                    href="https://www.crisisclassroom.com/projects/fundraising-fridays"
                    className="link-6"
                  >
                    <img
                      src={require("../../image/archive/IMG_7423.jpg")}
                      alt="Fundraising Fridays"
                      width="100%"
                      className="img-responsive day"
                    />
                  </a>
                  <a
                    href="https://www.crisisclassroom.com/projects/fundraising-fridays"
                    className="more-info"
                  >
                    MORE INFO
                  </a>
                </div>
                <figcaption className="caption text-center">
                  <h2 className="text-center text-uppercase">
                    <a href="https://www.crisisclassroom.com/projects/fundraising-fridays">
                      Fundraising Fridays
                    </a>
                  </h2>
                  <p>
                    Fundraising Fridays are a great way to do something amazing
                    and life-changing for someone else without having
                    to&nbsp;leave&nbsp;the comforts of your own home.&nbsp;
                    Download the resource pack and away you go!
                  </p>{" "}
                </figcaption>
              </figure>
            </div>

            <div className="col-xs-12 col-sm-6">
              <figure className="thumbnail">
                <div className="img-container">
                  <a
                    href="https://www.crisisclassroom.com/projects/suzies-yard"
                    className="link-6"
                  >
                    <img
                      src={require("../../image/archive/CRISIS-0094-2.jpg")}
                      alt="Suzie's Yard"
                      width="100%"
                      className="img-responsive day day-b"
                    />
                  </a>
                  <a
                    href="https://www.crisisclassroom.com/projects/suzies-yard"
                    className="more-info"
                  >
                    MORE INFO
                  </a>
                </div>
                <figcaption className="caption text-center">
                  <h2 className="text-center text-uppercase">
                    <a href="https://www.crisisclassroom.com/projects/suzies-yard">
                      Suzie's Yard
                    </a>
                  </h2>
                  <p>
                    <a href="http://www.suziesyard.com">Suzie’s Yard</a> is an
                    organic farm in Southern Tuscany, near to the beautiful town
                    of Cetona.&nbsp;Owned and operated by Suzie Alexander, a
                    passionate humanitarian and advocate of traditional farming
                    methods, Suzie has been opening her home and sharing recipes
                    with the local migrant community since July 2017.&nbsp; Find
                    out what’s happening now.
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="clearfix hidden-xs" />

            <div className="col-xs-12 col-sm-6">
              <figure className="thumbnail">
                <div className="img-container">
                  <a
                    href="https://www.crisisclassroom.com/projects/supporting-refugees-with-their-further-education"
                    className="link-6"
                  >
                    <img
                      src={require("../../image/archive/CRISIS-0131.jpg")}
                      alt="Supporting Refugees with their Further Education"
                      width="100%"
                      className="img-responsive day day-b"
                    />
                  </a>
                  <a
                    href="https://www.crisisclassroom.com/projects/supporting-refugees-with-their-further-education"
                    className="more-info"
                  >
                    MORE INFO
                  </a>
                </div>
                <figcaption className="caption text-center">
                  <h2 className="text-center text-uppercase">
                    <a href="https://www.crisisclassroom.com/projects/supporting-refugees-with-their-further-education">
                      Supporting Refugees with their Further Education
                    </a>
                  </h2>
                  <p>
                    We run courses&nbsp;in understanding the impact that trauma
                    can have on learning and how to manage the overwhelming
                    experiences that come with settling in to a new home.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
