import '../../../styles/singleUser.css'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../../context/users/UsersContext';
import unnamed from '../../../assets/img/unnamed.png'
import { db } from '../../../firebase';
import format from 'date-fns/format'

const SingleUserPage = ({ match }) => {
    const { getSingleUser, singleUser, clearSingleUser } = useContext(UsersContext);
    const userId = match.params.userId;
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        db.collection('posts')
            .where("uid", "==", userId)
            .orderBy('createdAt', 'desc')
            .limit(2)
            .get()
            .then(snapshot => {
                setRecentPosts(snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                }))
            })
    }, [])

    useEffect(() => {
        getSingleUser(userId)

        return clearSingleUser
    }, [])

    return singleUser ? (
        <div className="single-user">
            <h1>{singleUser.username}</h1>
            <div className="flex-container">
                <div className="info">
                    {/* <div>
                        <span>Age</span>
                        <h3>{singleUser.age}</h3>
                    </div> */}
                    <div>
                        <span>From:</span>
                        <h3>{singleUser.city}</h3>
                    </div>
                    <div>
                        <span>Works at:</span>
                        <h3>{singleUser.company}</h3>
                    </div>
                    <div>
                        <span>Works as:</span>
                        <h3>{singleUser.job}</h3>
                    </div>
                    <div>
                        <span>Website:</span>
                        <h3>
                            <a href={`https://${singleUser.website}`} target="_blank" >{singleUser.website}</a>
                        </h3>
                    </div>
                </div>
                <div className="image">
                    <img src={singleUser.imageUrl || unnamed} alt="Photo" />
                    <h3>{singleUser.name}, {singleUser.age}</h3>
                    <div className="social">
                        <i className="fab fa-twitter fa-2x" style={{ color: '#00acee' }}></i>
                        <i className="fab fa-instagram fa-2x" style={{ color: '#E1306C' }}></i>
                        <i className="fab fa-github fa-2x"></i>
                    </div>
                </div>
                <div className="statistic">
                    <h3>Posts {singleUser.posts}</h3>
                    <h3>Comments: {singleUser.comments}</h3>
                    <h3>Member since: {format(singleUser.regDate.toDate(), 'PP')}</h3>
                </div>

            </div>
            <div className="recent-posts">
                <h2>Recent Posts</h2>
                {recentPosts && recentPosts.map((post, i) => (
                    <div key={i}>
                        <h3>{post.title}</h3>
                        <Link to={`/posts/${post.id}`}>{post.body.slice(0, 50)}...</Link>
                    </div>
                ))}
            </div>
        </div >
    ) :
        <div>Loading...</div>
}

export default SingleUserPage;