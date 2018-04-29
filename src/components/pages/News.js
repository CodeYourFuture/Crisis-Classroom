import React, { Component } from "react";
import "./style.css";

export default class News extends Component {
  render() {
    return (
      <div className="getStart">
        <h1 className="the-title text-center  welcome">NEWS</h1>

        <hr />
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4">
            <article>
              <a
                href="https://www.crisisclassroom.com/news/sponsored-drawing"
                className="thumbnail"
              >
                <figure>
                  <img
                    src="https://www.crisisclassroom.com//media/files/unnamed-3.jpg"
                    width="100%"
                    alt="Sponsored Drawing "
                    id="img-sponsored-drawing"
                    className="img-responsive mask-img day"
                  />
                </figure>
              </a>
              <h2 className=" text-uppercase">
                <a href="https://www.crisisclassroom.com/news/sponsored-drawing">
                  Sponsored Drawing{" "}
                </a>
              </h2>
              <small>
                <h5 className="h5"> </h5>
              </small>
              <div>
                <p>
                  Manus McGrogan will be raising money for Crisisclassroom and
                  Calais Action this winter!
                </p>
              </div>
            </article>
          </div>

          <div className="col-xs-4 col-sm-4 col-md-4">
            <article>
              <a
                href="https://www.crisisclassroom.com/news/volunteering-with-refugees-goes-live"
                className="thumbnail"
              >
                <figure>
                  <img
                    src="https://www.crisisclassroom.com//media/images/news/File_001.jpeg"
                    width="100%"
                    alt="Volunteering with Refugees Goes Live!"
                    id="img-volunteering-with-refugees-goes-live"
                    className="img-responsive mask-img day"
                  />
                </figure>
              </a>
              <h2 className=" text-uppercase">
                <a href="https://www.crisisclassroom.com/news/volunteering-with-refugees-goes-live">
                  Volunteering with Refugees Goes Live!
                </a>
              </h2>
              <small>
                <h5 className="h5">4 September 2017 </h5>
              </small>
              <div>
                <p>
                  Our MOOC{" "}
                  <a href="https://www.futurelearn.com/courses/volunteering-with-refugees">
                    “Volunteering with Refugees”
                  </a>{" "}
                  co-constructed with Cambridge English, goes live attracting
                  over 3000 participants from all over the world.&nbsp;
                </p>
              </div>
            </article>
          </div>

          <div className="col-xs-4 col-sm-4 col-md-4">
            <article>
              <a
                href="https://www.crisisclassroom.com/news/crisis-classroom-wins-rsa-catalyst-award"
                className="thumbnail"
              >
                <figure>
                  <img
                    src="https://www.crisisclassroom.com//media/images/news/logo.png"
                    width="100%"
                    alt="Crisis Classroom Wins RSA Catalyst Award"
                    id="img-crisis-classroom-wins-rsa-catalyst-award"
                    className="img-responsive mask-img day"
                  />
                </figure>
              </a>
              <h2 className=" text-uppercase">
                <a href="https://www.crisisclassroom.com/news/crisis-classroom-wins-rsa-catalyst-award">
                  Crisis Classroom Wins RSA Catalyst Award
                </a>
              </h2>
              <small>
                <h5 className="h5">3 September 2017 </h5>
              </small>
              <div>
                <p>
                  Crisis Classroom is the proud recipient of a £10,000 Catalyst
                  Award from{" "}
                  <a href="https://www.thersa.org/fellowship/project-support">
                    the Royal Society of Arts (RSA)
                  </a>{" "}
                  in London. We have been awarded the grant to build digital
                  resources to magnify the impact and reach of our training.
                </p>
              </div>
            </article>{" "}
          </div>

          <div className="col-xs-4 col-sm-4 col-md-4">
            <article>
              <a
                href="https://www.crisisclassroom.com/news/crisis-classroom-joins-art27"
                className="thumbnail"
              >
                <figure>
                  <img
                    src="https://www.crisisclassroom.com//media/images/news/logo_art3-1-1.png"
                    width="100%"
                    alt="Crisis Classroom Joins Art.27"
                    id="img-crisis-classroom-joins-art27"
                    className="img-responsive mask-img day"
                  />
                </figure>
              </a>
              <h2 className=" text-uppercase">
                <a href="https://www.crisisclassroom.com/news/crisis-classroom-joins-art27">
                  Crisis Classroom Joins Art.27
                </a>
              </h2>
              <small>
                <h5 className="h5">8 February 2017 </h5>
              </small>
              <div>
                <p>
                  Crisis Classroom becomes one of the founder members of{" "}
                  <a href="https://art27.art">Art.27</a>&nbsp;a new network of
                  European arts organisations responding to the influx of
                  refugees fleeing war and oppression in the Middle East and
                  Africa.
                </p>
              </div>
            </article>{" "}
          </div>

          <div className="light">
            <img
              src={require("../../image/archive/ser1.jpg")}
              alt="light"
              className="light"
            />
          </div>
        </div>
      </div>
    );
  }
}
