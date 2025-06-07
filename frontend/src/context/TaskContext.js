import React, { createContext, useReducer } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

const initialState = {
  tasks: [],
  filteredTasks: [],
  currentTask: null,
  loading: true,
  error: null,
  filter: {
    status: 'all',
    priority: 'all',
    search: ''
  }
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        filteredTasks: applyFilters(action.payload, state.filter),
        loading: false
      };
    case 'GET_TASK':
      return {
        ...state,
        currentTask: action.payload,
        loading: false
      };
    case 'ADD_TASK':
      const newTasks = [action.payload, ...state.tasks];
      return {
        ...state,
        tasks: newTasks,
        filteredTasks: applyFilters(newTasks, state.filter),
        loading: false
      };
    case 'UPDATE_TASK':
      const updatedTasks = state.tasks.map(task =>
        task._id === action.payload._id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: applyFilters(updatedTasks, state.filter),
        loading: false,
        currentTask: null
      };
    case 'DELETE_TASK':
      const remainingTasks = state.tasks.filter(task => task._id !== action.payload);
      return {
        ...state,
        tasks: remainingTasks,
        filteredTasks: applyFilters(remainingTasks, state.filter),
        loading: false
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        filteredTasks: applyFilters(state.tasks, action.payload)
      };
    case 'TASK_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        currentTask: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

// Helper function to apply filters
const applyFilters = (tasks, filter) => {
  let filteredTasks = [...tasks];
  
  // Filter by status
  if (filter.status !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.status === filter.status);
  }
  
  // Filter by priority
  if (filter.priority !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
  }
  
  // Filter by search text
  if (filter.search.trim() !== '') {
    const searchTerm = filter.search.toLowerCase();
    filteredTasks = filteredTasks.filter(
      task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm))
    );
  }
  
  return filteredTasks;
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Get all tasks
  const getTasks = async () => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      const res = await axios.get('/api/tasks');
      
      dispatch({
        type: 'GET_TASKS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to fetch tasks'
      });
    }
  };

  // Get single task
  const getTask = async id => {
    dispatch({ type: 'SET_LOADING' });
    
    try {
      const res = await axios.get(`/api/tasks/${id}`);
      
      dispatch({
        type: 'GET_TASK',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to fetch task'
      });
    }
  };

  // Add task
  const addTask = async task => {
    try {
      const res = await axios.post('/api/tasks', task);
      
      dispatch({
        type: 'ADD_TASK',
        payload: res.data.data
      });
      
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to add task'
      });
      throw err;
    }
  };

  // Update task
  const updateTask = async task => {
    try {
      const res = await axios.put(`/api/tasks/${task._id}`, task);
      
      dispatch({
        type: 'UPDATE_TASK',
        payload: res.data.data
      });
      
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to update task'
      });
      throw err;
    }
  };

  // Delete task
  const deleteTask = async id => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      
      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to delete task'
      });
    }
  };

  // Set current task for editing
  const setCurrentTask = task => {
    dispatch({
      type: 'GET_TASK',
      payload: task
    });
  };

  // Clear current task
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Set filter
  const setFilter = filter => {
    dispatch({
      type: 'SET_FILTER',
      payload: filter
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        filteredTasks: state.filteredTasks,
        currentTask: state.currentTask,
        loading: state.loading,
        error: state.error,
        filter: state.filter,
        getTasks,
        getTask,
        addTask,
        updateTask,
        deleteTask,
        setCurrentTask,
        clearCurrent,
        setFilter,
        clearError
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};