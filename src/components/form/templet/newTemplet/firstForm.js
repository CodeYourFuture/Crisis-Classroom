import React from "react";
// import { Link } from "react-router-dom";
import Input from "../../../input";
import Label from "../../../label";
import S3Uploader from "../../../imageUploader";

export default class FirstForm extends React.Component {
  render() {
    return (
      <div>
              <h2>Creat New Templete</h2>

      <form>
        
        <div className="form-group">
          <Label value="Title" />
          <div className="row">
            <Input
              type="text"
              onChange={this.onChange}
              placeholder="Insert title"
              name="title"
            />
            &nbsp;
            <S3Uploader />
          </div>
        </div>
        <div className="form-group">
          <Label value="Time to perpare" />
          <div className="row">
            <Input
              type="text"
              name="duration"
              onChange={this.onChange}
              placeholder="How much time does it require?"
              value={this.props.duration}
            />
            &nbsp;
            <S3Uploader />
          </div>
        </div>

        <div className="form-group">
          <Label value="N. People" />
          <div className="row">
            <Input
              type="text"
              name="numberOfPeople"
              onChange={this.onChange}
              placeholder="How many people is it for?"
              value={this.props.numberOfPeople}
            />
            &nbsp;
            <S3Uploader />
          </div>
        </div>
      </form>
      </div>
    );
  }
}
