import app from './index';

const port = 3000;

const server = app.listen(port, () => {
  console.log('Server ready at: http://localhost:3000');
});
