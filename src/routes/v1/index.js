const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const testRoute = require('./test.route');
const uploadRoute = require('./upload.route');
const config = require('../../config/config');
const auth = require('../../middlewares/auth');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
    auth: false
  },
  {
    path: '/users',
    route: userRoute,
    auth: true
  },
  {
    path: '/upload',
    route: uploadRoute,
    auth: true
  },
  {
    path: '/tests',
    route: testRoute,
    auth: true
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {

  if(route.auth) {
    router.use(route.path,auth(), route.route);
  }
  else {
    router.use(route.path,route.route);
  }
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
