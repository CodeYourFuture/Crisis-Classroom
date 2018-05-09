import React from 'react';
// import { Link } from "react-router-dom";
import Input from '../../../input';
import axios from 'axios';
import Label from '../../../label';
import S3Uploader from '../../../imageUploader';
import './style.css';

export default class FirstForm extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			duration: '',
      serves: '',
      submitted: false,
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, duration, serves } = this.state;
		axios
			.post('http://localhost:3001/api/template', {
				title,
				duration,
				serves
			})
			.then((res) => {
				console.log(res);

				this.setState({
					submitted: true
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="application-form container">
				<h1 className="text-center mt-5 pt-4 pb-3 display-5">Please fill the form below:</h1>
				<form
					className="mb-4 mt-5"
					action="http://localhost:3001/api/finalTemplate"
					onSubmit={this.handleSubmit}
					method="post"
				>
					<div className="form-group  mt-5">
						<label className="lead">Title</label>
						<input
							type="text"
							name="title"
							id="title"
							className="form-control form-control-lg"
							placeholder="What's the title of your lesson plan?"
							value={this.state.title}
							required
							onChange={this.onChange}
						/>
						<small className="form-text text-muted">Foe example "Cooking Kebab"</small>
					</div>
					<div className="form-group  mt-5">
						<label className="lead">Duration</label>
						<input
							type="text"
							name="duration"
							id="duration"
							className="form-control form-control-lg"
							placeholder="How long does it take?"
							value={this.state.duration}
							required
							onChange={this.onChange}
						/>
						<small className="form-text text-muted">For example "60 mins"</small>
					</div>

					<div className="form-group  mt-5">
						<label htmlFor="fullName" className="lead">
							Serves
						</label>
						<input
							type="text"
							name="serves"
							id="serves"
							className="form-control form-control-lg"
							placeholder="How many people does it serve?"
							value={this.state.serves}
							required
							onChange={this.onChange}
						/>
						<small className="form-text text-muted">For example "4 or 6"</small>
					</div>
				</form>
			</div>
		);
	}
}
