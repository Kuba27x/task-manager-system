import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../context/AuthContext";
import { profileValidationSchema } from "../utils/validation";
import {
	FaUser,
	FaEnvelope,
	FaLock,
	FaSave,
	FaUserCircle,
} from "react-icons/fa";

const Profile = () => {
	const authContext = useContext(AuthContext);
	const { user, error, loadUser } = authContext;
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [loading, setLoading] = useState(true);

	// Load fresh user data when component mounts
	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			await loadUser();
			setLoading(false);
		};

		fetchUserData();
	}, [loadUser]);

	// Placeholder for the update profile functionality
	const updateProfile = async (values) => {
		// This would call an API endpoint to update the user profile
		// For now, we'll just show a success message
		setUpdateSuccess(true);
		setTimeout(() => setUpdateSuccess(false), 3000);
	};

	const initialValues = {
		username: user ? user.username : "",
		email: user ? user.email : "",
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	};

	return (
		<div className='container my-5'>
			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<div className='card shadow'>
						<div className='card-header bg-primary text-white'>
							<h2 className='mb-0'>
								<FaUserCircle className='me-2' />
								User Profile
							</h2>
						</div>
						<div className='card-body'>
							{error && (
								<div className='alert alert-danger'>
									{error}
								</div>
							)}

							{updateSuccess && (
								<div className='alert alert-success'>
									Profile updated successfully!
								</div>
							)}

							<Formik
								initialValues={initialValues}
								validationSchema={profileValidationSchema}
								onSubmit={updateProfile}
								enableReinitialize>
								{({ isSubmitting }) => (
									<Form>
										<div className='mb-3'>
											<label
												htmlFor='username'
												className='form-label'>
												<FaUser className='me-2' />
												Username
											</label>
											<Field
												type='text'
												id='username'
												name='username'
												className='form-control'
											/>
											<ErrorMessage
												name='username'
												component='div'
												className='text-danger mt-1'
											/>
										</div>

										<div className='mb-3'>
											<label
												htmlFor='email'
												className='form-label'>
												<FaEnvelope className='me-2' />
												Email
											</label>
											<Field
												type='email'
												id='email'
												name='email'
												className='form-control'
											/>
											<ErrorMessage
												name='email'
												component='div'
												className='text-danger mt-1'
											/>
										</div>

										<div className='mb-4'>
											<h4 className='border-bottom pb-2'>
												Change Password
											</h4>
											<div className='mb-3'>
												<label
													htmlFor='currentPassword'
													className='form-label'>
													<FaLock className='me-2' />
													Current Password
												</label>
												<Field
													type='password'
													id='currentPassword'
													name='currentPassword'
													className='form-control'
													placeholder='Enter your current password'
												/>
												<ErrorMessage
													name='currentPassword'
													component='div'
													className='text-danger mt-1'
												/>
											</div>

											<div className='mb-3'>
												<label
													htmlFor='newPassword'
													className='form-label'>
													<FaLock className='me-2' />
													New Password
												</label>
												<Field
													type='password'
													id='newPassword'
													name='newPassword'
													className='form-control'
													placeholder='Enter your new password'
												/>
												<ErrorMessage
													name='newPassword'
													component='div'
													className='text-danger mt-1'
												/>
											</div>

											<div className='mb-3'>
												<label
													htmlFor='confirmNewPassword'
													className='form-label'>
													<FaLock className='me-2' />
													Confirm New Password
												</label>
												<Field
													type='password'
													id='confirmNewPassword'
													name='confirmNewPassword'
													className='form-control'
													placeholder='Confirm your new password'
												/>
												<ErrorMessage
													name='confirmNewPassword'
													component='div'
													className='text-danger mt-1'
												/>
											</div>
										</div>

										<div className='d-grid'>
											<button
												type='submit'
												className='btn btn-primary'
												disabled={isSubmitting}>
												{isSubmitting ? (
													<>
														<span
															className='spinner-border spinner-border-sm me-2'
															role='status'
															aria-hidden='true'></span>
														Updating...
													</>
												) : (
													<>
														<FaSave className='me-2' />
														Save Changes
													</>
												)}
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>

					<div className='card mt-4 shadow'>
						<div className='card-header bg-light'>
							<h4 className='mb-0'>Account Information</h4>
						</div>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-6'>
									<p>
										<strong>User ID:</strong> {user?._id}
									</p>
									<p>
										<strong>Account Created:</strong>{" "}
										{user?.createdAt
											? new Date(
													user.createdAt
											  ).toLocaleDateString()
											: "N/A"}
									</p>
								</div>
								<div className='col-md-6'>
									<p>
										<strong>Last Login:</strong>{" "}
										{new Date().toLocaleDateString()}
									</p>
									<p>
										<strong>Status:</strong>{" "}
										<span className='badge bg-success'>
											Active
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
