import { useContext, useEffect } from 'react';
import { UsersContext } from '../../../context/users/UsersContext';
import unnamed from '../../../assets/img/unnamed.png'

const SingleUserPage = ({ match }) => {
    const { getSingleUser, singleUser, clearSingleUser } = useContext(UsersContext);
    const userId = match.params.userId;

    useEffect(() => {
        getSingleUser(userId)

        return clearSingleUser
    }, [])

    return singleUser ? (
        <div style={{ textAlign: 'center' }}>
            <h1>{singleUser.username}</h1>
            <br /><br />
            <img src={singleUser.imageUrl || unnamed} alt="Photo" />
            <br /><br /><br />
            <h2>Name: {singleUser.name || 'N/A'}</h2>
            <h2>Age: {singleUser.age}</h2>
            <h2>City: {singleUser.city}</h2>
            <h2>Company: {singleUser.company}</h2>
            <h2>Job: {singleUser.job}</h2>
            <h2>Website: {singleUser.website}</h2>
        </div>
    ) :
        <div>Loading...</div>
}

export default SingleUserPage;