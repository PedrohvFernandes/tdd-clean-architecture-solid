export default {
  fourDev: {
    default: {
      source: {
        path: '/',
        routeFragment: '/',
        next: {}
      },
      notFound: '*'
      // exact: true,
    },
    login: {
      path: '/login',
      routeFragment: '/login',
      next: {}
    },
    signup: {
      path: '/signup',
      routeFragment: '/signup',
      next: {}
    },
    logged: {
      path: '/logged',
      routeFragment: '/logged',
      next: {
        surveyList: {
          path: '/logged/survey-list',
          routeFragment: '/logged/survey-list',
          next: {}
        }
      }
    }
  }
}
