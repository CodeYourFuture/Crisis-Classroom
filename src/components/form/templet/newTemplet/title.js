// import ImageUploader from "react-image-uploader";
import React from "react";
import { Link } from "react-router-dom";
import Input from "../../../input";
import Button from "../../../button";
import Label from "../../../label";
import S3Uploader from "../../../imageUploader";
// import "./style.css";

export default class LessonTitle extends React.Component {
  render() {
    return (
      <div className="lesson-form">
        <h2>Creat New Templete</h2>
        <form>
          <div class="form-group">
            <Label value="Title" />
            <div className="row">
              <Input type="text" value="Inseet title" />
              &nbsp;
              <S3Uploader />
            </div>
          </div>
          <div class="form-group">
            <Label value="Time to perpare" />
            <div className="row">
              <Input type="text" value="How much time does it require?" />
              &nbsp;
              <S3Uploader />
            </div>
          </div>
          <div class="form-group">
            <Label value="N. People" />
            <div className="row">
              <Input type="text" value="How many people is it for?" />
              &nbsp;
              <S3Uploader />
            </div>
          </div>
          <Link to="/register">
            <Button value="Create" />
          </Link>
        </form>
      </div>
    );
  }
}
