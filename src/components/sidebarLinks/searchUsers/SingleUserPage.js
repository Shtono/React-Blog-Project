import { useContext, useEffect } from 'react';
import { UsersContext } from '../../../context/users/UsersContext';

const SingleUserPage = ({ match }) => {
    const { getSingleUser, singleUser } = useContext(UsersContext);
    const userId = match.params.userId;

    useEffect(() => {
        getSingleUser(userId)
    }, [])

    return singleUser ? (
        <div>
            <h1>Username: {singleUser.username}</h1>
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