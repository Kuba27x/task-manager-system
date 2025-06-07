import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
	FaTasks,
	FaCheckCircle,
	FaUserShield,
	FaMobileAlt,
} from "react-icons/fa";

const Home = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;

	return (
		<>
			<div className='hero'>
				<div className='container'>
					<div className='row align-items-center'>
						{" "}
						<div className='col-md-6'>
							<h1 className='display-4 fw-bold'>
								Task Management System
							</h1>
							<p className='lead'>
								A simple, efficient way to organize your tasks
								and boost productivity
							</p>
							{isAuthenticated ? (
								<Link
									to='/dashboard'
									className='btn btn-light btn-lg'>
									Go to Dashboard
								</Link>
							) : (
								<div>
									<Link
										to='/register'
										className='btn btn-light btn-lg me-3'>
										Get Started
									</Link>
									<Link
										to='/login'
										className='btn btn-outline-light btn-lg'>
										Login
									</Link>
								</div>
							)}
						</div>
						<div className='col-md-6 d-none d-md-block'>
							<img
								src='/task-illustration.svg'
								alt='Task Management'
								className='img-fluid'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='container my-5'>
				<h2 className='text-center mb-4'>Features</h2>
				<div className='row'>
					<div className='col-md-4 mb-4'>
						<div className='card feature-card h-100'>
							<div className='card-body text-center'>
								<FaTasks
									className='text-primary mb-3'
									size={40}
								/>
								<h3>Task Organization</h3>
								<p>
									Create, edit, and organize tasks with
									priorities, due dates, and status tracking
								</p>
							</div>
						</div>
					</div>

					<div className='col-md-4 mb-4'>
						<div className='card feature-card h-100'>
							<div className='card-body text-center'>
								<FaCheckCircle
									className='text-primary mb-3'
									size={40}
								/>
								<h3>Progress Tracking</h3>
								<p>
									Monitor your progress with visual statistics
									and task completion metrics
								</p>
							</div>
						</div>
					</div>

					<div className='col-md-4 mb-4'>
						<div className='card feature-card h-100'>
							<div className='card-body text-center'>
								<FaUserShield
									className='text-primary mb-3'
									size={40}
								/>
								<h3>Secure Access</h3>
								<p>
									Your tasks are private and secure with user
									authentication and data protection
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='bg-light py-5'>
				<div className='container'>
					<div className='row align-items-center'>
						<div className='col-md-6'>
							<h2>Why Use Our Task Manager?</h2>
							<ul className='list-group list-group-flush'>
								<li className='list-group-item bg-transparent'>
									<FaCheckCircle className='text-success me-2' />{" "}
									Simple and intuitive interface
								</li>
								<li className='list-group-item bg-transparent'>
									<FaCheckCircle className='text-success me-2' />{" "}
									Priority-based task organization
								</li>
								<li className='list-group-item bg-transparent'>
									<FaCheckCircle className='text-success me-2' />{" "}
									Filter and search functionality
								</li>
								<li className='list-group-item bg-transparent'>
									<FaCheckCircle className='text-success me-2' />{" "}
									Secure user authentication
								</li>
								<li className='list-group-item bg-transparent'>
									<FaCheckCircle className='text-success me-2' />{" "}
									Mobile-friendly design
								</li>
							</ul>
						</div>
						<div className='col-md-6 mt-4 mt-md-0'>
							<div className='card shadow'>
								<div className='card-body'>
									<h3 className='card-title'>
										Get Started Today
									</h3>
									<p className='card-text'>
										Join thousands of users who have
										improved their productivity with our
										task management system.
									</p>
									{!isAuthenticated && (
										<Link
											to='/register'
											className='btn btn-primary'>
											Create Free Account
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer className='bg-dark text-light py-4'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6'>
							<h5>
								<FaTasks className='me-2' /> Task Management
								System
							</h5>
							<p>
								© {new Date().getFullYear()} - All rights
								reserved
							</p>
						</div>
						<div className='col-md-6 text-md-end'>
							<FaMobileAlt className='me-2' />
							<span>Available on all devices</span>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Home;
