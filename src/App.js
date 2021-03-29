import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersContextProvider from './context/users/UsersContext'
import Notification from './components/layout/Notification';
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import PrivateRouteAdmin from './components/privateRoutes/PrivateRouteAdmin';
import NoMatch from './components/privateRoutes/NoMatch';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import SinglePageArticle from './components/home/SinglePageArticle';
import Blog from "./pages/Blog";
import SinglePost from "./components/blogPost/singlePost/SinglePost";
import MyProfile from './components/sidebarLinks/myprofile/MyProfile';
import SeachUsers from './components/sidebarLinks/searchUsers/SearchUsers';
import SingleUserPage from './components/sidebarLinks/searchUsers/SingleUserPage';
import AddPost from './components/blogPost/AddPost';
import MyPosts from './components/sidebarLinks/myPosts/MyPosts';
import ChatRooms from './components/sidebarLinks/chatRooms/ChatRooms';
import AddArticle from './components/home/AddArticle';
import Sidebar from './components/layout/sidebar/Sidebar';
// import './styles/scrollBar.css'
import Logo from './assets/GM-Logo.png'

function App() {
  return (
    <Router>
      <div className="App">
        <img className="gm-logo" src={Logo} alt="" />
        <Navbar />
        <UsersContextProvider>
          <Sidebar />
          <Notification />
          <div className="content">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/news/:articleId' component={SinglePageArticle} />
              <PrivateRoute path='/blog' component={Blog} />
              <PrivateRoute exact path="/posts/:blog_id" component={SinglePost} />

              <PrivateRoute path="/myprofile" component={MyProfile} />
              <PrivateRoute exact path="/users" component={SeachUsers} />
              <PrivateRoute path="/users/:userId" component={SingleUserPage} />
              <PrivateRoute path="/createPost" component={AddPost} />
              <PrivateRoute path="/myPosts" component={MyPosts} />
              <PrivateRoute path="/chatrooms" component={ChatRooms} />

              <PrivateRouteAdmin path="/createarticle" component={AddArticle} />

              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />

              <Route path='*' component={NoMatch} />
            </Switch>
          </div>
        </UsersContextProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
