import './styles/scrollBar.css'
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostsState from "./context/posts/PostsState";
import Blog from "./pages/Blog";
import UsersContextProvider from './context/users/UsersContext'
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import SinglePost from "./components/blogPost/SinglePost";
import AuthContextProvider from './context/auth/AuthContext'
import Sidebar from './components/layout/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <PostsState>
          <div className="App">
            <Navbar />
            <div className="content">
              <Sidebar />
              {/* Try to implement a container (if needed)  for CSS*/}
              <Switch>
                <UsersContextProvider>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exatc path='/blog' component={Blog} />
                  <PrivateRoute exact path="/posts/:blog_id" component={SinglePost} />
                  <PrivateRoute path='/user' component={Dashboard} />
                  <Route path='/login' component={Login} />
                  <Route path='/signup' component={Signup} />
                </UsersContextProvider>
              </Switch>
            </div>
            <Footer />
          </div>
        </PostsState>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
