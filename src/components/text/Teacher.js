import React, { Component } from "react";

export default class Teacher extends Component {
  render() {
    return (
      <div className="row">
        <img
          src="https://www.crisisclassroom.com//media/images/banners/CRISIS-0105.jpg"
          alt="teachers"
        />

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
}
