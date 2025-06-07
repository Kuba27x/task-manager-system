// Validate task input
exports.validateTaskInput = (req, res, next) => {
    const { title, status, priority } = req.body;
    let errors = [];
  
    // Title validation
    if (!title) {
      errors.push({ field: 'title', message: 'Title is required' });
    } else if (title.length > 100) {
      errors.push({ field: 'title', message: 'Title cannot be more than 100 characters' });
    }
  
    // Status validation
    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
      errors.push({ field: 'status', message: 'Status must be pending, in-progress, or completed' });
    }
  
    // Priority validation
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      errors.push({ field: 'priority', message: 'Priority must be low, medium, or high' });
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors
      });
    }
  
    next();
  };
  
  // Validate user input for registration
  exports.validateRegisterInput = (req, res, next) => {
    const { username, email, password } = req.body;
    let errors = [];
  
    // Username validation
    if (!username) {
      errors.push({ field: 'username', message: 'Username is required' });
    } else if (username.length < 3) {
      errors.push({ field: 'username', message: 'Username must be at least 3 characters' });
    }
  
    // Email validation
    if (!email) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else {
      const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailRegex.test(email)) {
        errors.push({ field: 'email', message: 'Please provide a valid email' });
      }
    }
  
    // Password validation
    if (!password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (password.length < 6) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors
      });
    }
  
    next();
  };
  
  // Validate user input for login
  exports.validateLoginInput = (req, res, next) => {
    const { email, password } = req.body;
    let errors = [];
  
    // Email validation
    if (!email) {
      errors.push({ field: 'email', message: 'Email is required' });
    }
  
    // Password validation
    if (!password) {
      errors.push({ field: 'password', message: 'Password is required' });
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors
      });
    }
  
    next();
  };