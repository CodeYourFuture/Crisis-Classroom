import React, { Component } from "react";

export default class Teacher extends Component {
    render() {
        return (
            <div className="getStart">
            <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                    <h1 className="the-title text-center welcome">TEACHERS</h1>
                </div>
                <img
                    src={require("../../image/archive/teacher.jpg")}
                    alt="teacher"
                    className="img-responsive teacher-baner "
                />

                

                <p className="col-xs-12">Meet our amazing volunteer teachers.  Each of them has been on their own journey and has their own story to tell.  Every teacher is part of our global, Crisis classroom patchwork.  Soon we hope to have volunteers in every town and city in the world.  So that everyone who wants an education can receive one.  If you can’t go to school, then school will come to you!</p>

                <div className="container">
                    <div className="row">




                        <div className="col-xs-12 col-sm-4 item">
                            <figure className="thumbnail">
                                <a href="">
                                    <div className="teacher-image-kate">
                                        <img src={require("../../image/archive/kate.jpg")} width="100%" alt="Kate McAllister" class="img-responsive" />
                                    </div>
                                    <figcaption class="caption text-center">
                                        <h2 className="text-uppercase">Kate McAllister</h2>
                                    </figcaption>
                                </a>
                            </figure>
                        </div>




                        <div className="col-xs-12 col-sm-4 item">
                            <figure className="thumbnail">
                                <a href="">
                                    <div className="teacher-image-kate">
                                        <img src={require("../../image/archive/georgina.jpg")} width="100%" alt="Kate McAllister" class="img-responsive" />
                                    </div>
                                    <figcaption class="caption text-center">
                                        <h2 className="text-uppercase">GEORGINA ROBERTSON</h2>
                                    </figcaption>
                                </a>
                            </figure>
                        </div>

                        
                        <div className="col-xs-12 col-sm-4 item">
                            <figure className="thumbnail">
                                <a href="£">
                                    <div className="teacher-image-kate">
                                        <img src={require("../../image/archive/darren.jpg")} width="100%" alt="Kate McAllister" class="img-responsive" />
                                    </div>
                                    <figcaption class="caption text-center">
                                        <h2 className="text-uppercase">DARREN ABRAHAMS</h2>
                                    </figcaption>
                                </a>
                            </figure>
                        </div>


            
                       




                    </div>
                </div>

                <div class="col-xs-12 col-sm-offset-1 col-sm-10">
                    <h1 class="the-title pink text-center">Teachers</h1>
                </div>
                <p>
                    Meet our amazing volunteer teachers. Each of them has been on their
          own journey and has their own story to tell. Every teacher is part of
          our global, Crisis Classroom patchwork. Soon we hope to have
          volunteers in every town and city in the world. So that everyone who
          wants an education can receive one. If you can’t go to school, then
          school will come to you!
        </p>


<img src="http://www.alet.org.uk/wp-content/uploads/2016/09/swirl-300x300.jpg" alt="teaching" className="teaching"/>





            </div>
        );
    }

};


