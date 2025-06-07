import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TaskContext } from '../../context/TaskContext';
import { taskValidationSchema } from '../../utils/validation';
import { FaPlus, FaEdit, FaTimes, FaCalendarAlt, FaFlag, FaTasks } from 'react-icons/fa';

const TaskForm = () => {
  const taskContext = useContext(TaskContext);
  const { addTask, updateTask, currentTask, clearCurrent, error } = taskContext;

  const initialValues = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (currentTask === null) {
        await addTask(values);
      } else {
        await updateTask({ ...values, _id: currentTask._id });
      }
      resetForm();
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {currentTask ? (
            <>
              <FaEdit className="me-2" />
              Edit Task
            </>
          ) : (
            <>
              <FaPlus className="me-2" />
              Add New Task
            </>
          )}
        </h4>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        
        <Formik
          initialValues={currentTask || initialValues}
          validationSchema={taskValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  <FaTasks className="me-2" />
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Task title"
                />
                <ErrorMessage name="title" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Task description"
                  rows="3"
                />
                <ErrorMessage name="description" component="div" className="text-danger mt-1" />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="status" className="form-label">Status</label>
                  <Field as="select" id="status" name="status" className="form-select">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger mt-1" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="priority" className="form-label">
                    <FaFlag className="me-2" />
                    Priority
                  </label>
                  <Field as="select" id="priority" name="priority" className="form-select">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Field>
                  <ErrorMessage name="priority" component="div" className="text-danger mt-1" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  <FaCalendarAlt className="me-2" />
                  Due Date
                </label>
                <Field
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-control"
                />
                <ErrorMessage name="dueDate" component="div" className="text-danger mt-1" />
              </div>

              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {currentTask ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      {currentTask ? (
                        <>
                          <FaEdit className="me-2" />
                          Update Task
                        </>
                      ) : (
                        <>
                          <FaPlus className="me-2" />
                          Add Task
                        </>
                      )}
                    </>
                  )}
                </button>
                
                {currentTask && (
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => clearCurrent()}
                  >
                    <FaTimes className="me-2" />
                    Cancel
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;