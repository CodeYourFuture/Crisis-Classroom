import React, { Component } from "react";

export default class Teacher extends Component {
    render() {
        return (
            <div>
                <img
                    src={require("../../image/archive/teacher.jpg")}
                    alt="teacher"
                    className="img-responsive teacher-baner "
                />

                <div class="col-xs-12 col-sm-offset-1 col-sm-10">
                    <h1 class="the-title pink text-center">Teachers</h1>
                </div>

                <p>Meet our amazing volunteer teachers.  Each of them has been on their own journey and has their own story to tell.  Every teacher is part of our global, Crisis Classroom patchwork.  Soon we hope to have volunteers in every town and city in the world.  So that everyone who wants an education can receive one.  If you can’t go to school, then school will come to you!</p>

                <div class="container">
                    <div class="row">
                        <div class="col-md">
                        <div>
                     <img
                        src={require("../../image/archive/kate.jpg")}
                        alt="teacher"
                        className="img-responsive teacher-image-kate "
                    /> 
                    <h4 >KATE MCALLISTER</h4>
                </div>
                     </div>



                     <div class="col-md">
                     <div>
                  <img
                     src={require("../../image/archive/georgina.jpg")}
                     alt="teacher"
                     className="img-responsive teacher-image-kate "
                 /> 
                 <h4 >GEORGINA ROBERTSON</h4>
             </div>
                  </div>

                  <div class="col-md">
                     <div>
                  <img
                     src={require("../../image/archive/darren.jpg")}
                     alt="teacher"
                     className="img-responsive teacher-image-kate "
                 /> 
                 <h4 >DARREN ABRAHAMS</h4>
             </div>
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




               


            </div>
        );
    }

};


       