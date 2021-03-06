import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Article from './components/Article/Article'
import NotFound from './components/NotFound/NotFound'
import { createContext, useState, useEffect } from 'react'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import AddArticle from './components/Admin/AddArticle'
import AddAdmin from './components/Admin/AddAdmin'
import AdminRoute from './components/AdminRoute/AdminRoute'
import Splash from './components/Splash/Splash'
export const UserContext = createContext()

const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [])
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    role: 0,
  })
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {loading ? (
        <Splash loading={loading} />
      ) : (
        <Router>
          <ToastContainer position='bottom-right' />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <AdminRoute path='/article/add'>
              <AddArticle />
            </AdminRoute>
            <AdminRoute path='/admin/add'>
              <AddAdmin />
            </AdminRoute>
            <PrivateRoute path='/article/:articleId'>
              <Article />
            </PrivateRoute>

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      )}
    </UserContext.Provider>
  )
}

export default App
