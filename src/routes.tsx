import { RouteObject } from 'react-router-dom'
import IndexRoute from './routes/index/IndexRoute.tsx'
import DashboardRoute from './routes/curriculums/dashboard/DashboardRoute.tsx'
import SignInRoute from './routes/authentication/SignInRoute.tsx'
import CallbackRoute from './routes/authentication/CallbackRoute.tsx'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <IndexRoute/>,
  },
  {
    path: '/auth/sign-in',
    element: <SignInRoute/>,
  },
  {
    path: '/auth/callback',
    element: <CallbackRoute/>,
  },
  {
    path: '/curriculums/:curriculumId',
    element: <DashboardRoute/>,
  },
]

export default routes
