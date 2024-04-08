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
    }
  }
}
