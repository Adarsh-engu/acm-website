export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      error: 'Validation Failed',
      details: error.errors ? error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      })) : [{ message: error.message || 'Unknown error' }]
    });
  }
};
