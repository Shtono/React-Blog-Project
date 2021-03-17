import './styles/scrollBar.css'
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostsContextProvider from "./context/posts/PostsContext";
import Blog from "./pages/Blog";
import UsersContextProvider from './context/users/UsersContext'
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import SinglePost from "./components/blogPost/singlePost/SinglePost";
import AuthContextProvider from './context/auth/AuthContext'
import Sidebar from './components/layout/sidebar/Sidebar';
import MyProfile from './components/sidebarLinks/myprofile/MyProfile';
import SeachUsers from './components/sidebarLinks/searchUsers/SearchUsers';
import AddPost from './components/blogPost/AddPost';
import MyPosts from './components/sidebarLinks/myPosts/MyPosts';
import ChatRooms from './components/sidebarLinks/chatRooms/ChatRooms';

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <PostsContextProvider>
          <div className="App">
            <Navbar />
            <div className="content">
              <Sidebar />
              {/* Try to implement a container (if needed)  for CSS*/}
              <Switch>
                <UsersContextProvider>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/blog' component={Blog} />
                  <PrivateRoute exact path="/posts/:blog_id" component={SinglePost} />

                  <PrivateRoute exact path="/myprofile" component={MyProfile} />
                  <PrivateRoute exact path="/searchUsers" component={SeachUsers} />
                  <PrivateRoute exact path="/createPost" component={AddPost} />
                  <PrivateRoute exact path="/myPosts" component={MyPosts} />
                  <PrivateRoute exact path="/chatrooms" component={ChatRooms} />

                  <Route path='/login' component={Login} />
                  <Route path='/signup' component={Signup} />
                </UsersContextProvider>
              </Switch>
            </div>
            <Footer />
          </div>
        </PostsContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
