import { createBrowserRouter } from 'react-router-dom'

import AddCard from '../pages/AddCard/AddCard'
import AllCards from '../pages/AllCards/AllCards'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Login from '../pages/Login/Login'
import OtherProfile from '../pages/OtherProfile/OtherProfile'
import PostInfo from '../pages/PostInfo/PostInfo'
import Profile from '../pages/Profile/Profile'
import Registartion from '../pages/Registration/Registration'
import Welcome from '../pages/Welcome/Welcome'

export const router = createBrowserRouter([
  { path: '/', element: <Welcome />, errorElement: <ErrorPage /> },
  { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
  {
    path: '/registration',
    element: <Registartion />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/addCard',
    element: <AddCard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/allCards',
    element: <AllCards />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/postInfo/:id',
    element: <PostInfo />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile/:id',
    element: <OtherProfile />,
    errorElement: <ErrorPage />,
  },
])
