import '../../styles/home.css'
import PrivateRoute from '../privateRoutes/PrivateRoute';
import MyProfile from './myprofile/MyProfile';
import SeachUsers from './searchUsers/SearchUsers';
import AddPost from '../blogPost/AddPost';
import MyPosts from './myPosts/MyPosts';
// import Messages from './messages/Messages';


const Dashboard = () => {
  return (
    <div className="dashboard">
      <PrivateRoute exact path="/user/myprofile" component={MyProfile} />
      <PrivateRoute exact path="/user/searchUsers" component={SeachUsers} />
      <PrivateRoute exact path="/user/createPost" component={AddPost} />
      <PrivateRoute exact path="/user/myPosts" component={MyPosts} />
      {/* <PrivateRoute exact path="/user/messages" component={Messages} /> */}

    </div >
  );
}

export default Dashboard;