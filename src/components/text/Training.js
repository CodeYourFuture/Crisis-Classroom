import React, { Component } from "react";

export default class Training extends Component {
    render() {
        return (
            <div>
              <h1>WHY TRAIN?</h1>
        <p>
          “I know what I’m doing, why do I need to complete training to
          volunteer?” The more prepared you are before you volunteer the better
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
        </p>

        <h3>TRAINING & WORKSHOPS IN PROGRESS</h3>
                <img
                    src={require("../../image/archive/training.jpg")}
                    alt="crisis"
                    className="img-responsive training-image "
                />
                <h1 className="text-center">WHY TRAIN?</h1>
                <p className="text-center">“I know what I’m doing, why do I need to complete training to volunteer?”</p>

                <p>The more prepared you are before you volunteer the better you will be able to do your job, the more you will get out of the experience and the safer you will be.  When we see people suffering we feel so compelled to help that we want to jump straight in. However, when we take a breath & give ourselves that little bit of extra time to prepare we can achieve so much more.  This is the “put your oxygen mask on first” approach to volunteering.  Your students deserve the very best from their teachers.  Working alongside people who have experienced and are experiencing the effects of trauma is a tough job and it requires a particular set of skills which we will develop during our 3 step training.  You can take each step separately or book them together.  You must take step 1 before step 2 which leads to step 3.</p>

                <h3 className="text-center">TRAINING & WORKSHOPS IN PROGRESS</h3>
            </div>
        );
    }

};

  

