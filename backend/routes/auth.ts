import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
  // TODO: Implement signup logic
  res.send('Signup route');
});

router.post('/signin', (req, res) => {
  // TODO: Implement signin logic
  res.send('Signin route');
});

export default router;