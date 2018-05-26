import React, { Component } from "react";

export default class Teacher extends Component {
  render() {
    return (
      <div className="getStart">
        <h1 className="welcome">PROJECTS</h1>
        <p className="pro">
          No matter who you are, how old you are or where in the world you are,
          we believe with all our hearts that education isn’t a privilege but a
          fundamental human right. We uphold this right, we fight for it and we
          enable it. Unconstrained by bricks and mortar, unconcerned by age
          limits our classrooms are open to everyone. More than just algebra and
          verbs, this is relearning life in another language. To ask for a loaf
          of bread, to make new friends, to talk to a doctor about your child.
          This is education that helps you take back control and regain a sense
          of self so that life can begin.
        </p>
        <img
          src={require("../../image/archive/17-Fun-Machine-Learning-Projects-for-Beginners.jpg")}
          alt="projects"
          className="welcome"
        />
        <h1 className="empower">PROJECTS IN PROGRESS</h1>

        <div className="row" id="items">
          <div className="col-xs-12 col-sm-4 item  ">
            <figure className="thumbnail">
              <div className="mask-img">
                <img
                  src={require("../../image/archive/MelissaAlon.jpg")}
                  width="100%"
                  alt="From Brighton to the Balkans"
                  id="img-from-brighton-to-the-balkans"
                  className="img-responsive day"
                />
              </div>
              <h2 className="text-uppercase">
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
            </figure>
          </div>

          <div className="col-xs-12 col-sm-4 item cat-11 cla-5">
            <figure className="thumbnail">
              <div className="mask-img">
                <img
                  src={require("../../image/archive/P1030037.JPG")}
                  width="100%"
                  alt="Right Here Right Now"
                  id="img-right-here-right-now"
                  className="img-responsive day"
                />
              </div>

              <h2 className="text-uppercase">
                <a href="https://www.crisisclassroom.com/projects/right-here-right-now">
                  Right Here Right Now
                </a>
              </h2>
              <p>
                If you’re local and you’d like&nbsp;to do something&nbsp;to help
                others learn the skills and knowledge they need to get to the
                next step on their journey, we’d love to hear from you.
              </p>
            </figure>
          </div>

          <div className="col-xs-12 col-sm-4 item  ">
            <figure className="thumbnail">
              <div className="mask-img">
                <img
                  src={require("../../image/archive/IMG_7423.jpg")}
                  width="100%"
                  alt="Fundraising Fridays"
                  id="img-fundraising-fridays"
                  className="img-responsive day"
                />
              </div>
              <figcaption className="caption text-center">
                <h2 className="text-uppercase">
                  <a href="https://www.crisisclassroom.com/projects/fundraising-fridays">
                    Fundraising Fridays
                  </a>
                </h2>
                <p>
                  Fundraising Fridays are a great way to do something amazing
                  and life-changing for someone else without having
                  to&nbsp;leave&nbsp;the comforts of your own home.&nbsp;
                  Download the resource pack and away you go!
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="clearfix hidden-xs" />

          <div
            className="col-xs-12 col-sm-4 item cat-11 cla-4"
            data-alpha="suzies-yard"
            data-chron=""
          >
            <figure className="thumbnail">
              <div className="mask-img">
                <img
                  src={require("../../image/archive/CRISIS-0094-2.jpg")}
                  width="100%"
                  alt="Suzie's Yard"
                  id="img-suzies-yard"
                  className="img-responsive day"
                />
              </div>
              <figcaption className="caption text-center">
                <h2 className="text-uppercase">
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

          <div className="col-xs-12 col-sm-4 item cat-12 cla-4">
            <figure className="thumbnail">
              <div className="mask-img">
                <img
                  src={require("../../image/archive/CRISIS-0131.jpg")}
                  width="100%"
                  alt="Supporting Refugees with their Further Education"
                  id="img-supporting-refugees-with-their-further-education"
                  className="img-responsive day"
                />
              </div>
              <figcaption className="caption text-center">
                <h2 className="text-uppercase">
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

          <div className="col-xs-12 col-sm-4 item  ">
            <figure className="thumbnail">
              <div className="mask-img">
                <img
                  src={require("../../image/archive/CRISIS-0405.jpg")}
                  width="100%"
                  alt="Partner Projects"
                  id="img-partner-projects"
                  className="img-responsive day"
                />
              </div>

              <h2 className="text-uppercase">
                <a href="https://www.crisisclassroom.com/projects/partner-projects">
                  Partner Projects
                </a>
              </h2>
              <p>
                If you’re a partner project and you’d like to work with our
                volunteers then please get in touch.&nbsp;Just let us know if
                there are any particular skills you’re looking for and we’ll do
                our very best to help. Alon@crisisclassroom.com or
                Melissa@crisisclassroom.com&nbsp;
              </p>
            </figure>
          </div>
        </div>
      </div>
    );
  }
}
