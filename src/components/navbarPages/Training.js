import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Training extends Component {
    render() {
        return (
            <div className="getStart">
                <h1 className="text-center welcome">WHY TRAIN?</h1>
                <img
                    src={require("../../image/archive/training.jpg")}
                    alt="crisis"
                    className="img-responsive training-image  "
                />
                <div className="col-xs-12 col-sm-offset-2 col-sm-8 text-center">

                    
                    <p className="team-name">“I know what I’m doing, why do I need to complete training to
          volunteer?”</p>
          <img src="https://www.incimages.com/uploaded_files/image/970x450/getty_152414899_97046097045006_68075.jpg" alt="training" className="tr"/>
                    <p>
                        The more prepared you are before you volunteer the better
          you will be able to do your job, the more you will get out of the
          experience and the safer you will be. When we see people suffering we
          feel so compelled to help that we want to jump straight in. However,
          when we take a breath & give ourselves that little bit of extra time
          to prepare we can achieve so much more. This is the “put your oxygen
          mask on first” approach to volunteering. Your students deserve the
          very best from their teachers. Working alongside people who have
          experienced and are experiencing the effects of trauma is a tough job
          and it requires a particular set of skills which we will develop
          during our 3 step training. You can take each step separately or book
          them together. You must take step 1 before step 2 which leads to step
          3.
        </p></div>


                <div className="text-center text-uppercase ">
                    <h2 className="he">TRAINING & WORKSHOPS IN PROGRESS</h2>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-4">
                        <figure className="thumbnail">
                            <a href="https://www.crisisclassroom.com/training/day-1--building-you">
                                <img src="https://www.crisisclassroom.com//media/images/workshops/IMG_0904.jpg" alt="Day 1 - BUILDING YOU" className="img-reponsive day" width="100%" />
                            </a>

                            <figcaption className="caption text-center">
                                <h2><Link to="/training/day-one">Day 1 - BUILDING YOU </Link></h2>

                            </figcaption>

                        </figure>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                        <figure className="thumbnail">
                            <a href="https://www.crisisclassroom.com/training/day-2--building-resources">
                                <img src="https://www.crisisclassroom.com//media/images/workshops/IMG_0989.jpg" alt="Day 2 - BUILDING RESOURCES" className="img-reponsive day" width="100%" />
                            </a>
                            <figcaption className="caption text-center">
                                <h2><Link to="/training/day-two">Day 2 - BUILDING RESOURCES</Link></h2>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4">
                        <figure className="thumbnail">
                            <a href="https://www.crisisclassroom.com/training/day-3--building-community">
                                <img src="https://www.crisisclassroom.com//media/files/CRISIS-0094-2.jpg" alt="Day 3 - BUILDING COMMUNITY" className="img-reponsive day" width="100%" />
                            </a>
                            <figcaption className="caption text-center">
                                <h2><Link to="/training/day-three">Day 3 - BUILDING COMMUNITY</Link></h2>
                            </figcaption>
                        </figure>
                    </div>

                </div>
                <img src="http://www.vesalius.edu/wp-content/uploads/2016/02/photodune-8011412-hand-writing-never-stop-learning-m.jpg" alt="training" className="light"/>
                
            </div>
        );
    }

};



