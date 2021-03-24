import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { PostsContext } from '../../context/posts/PostsContext';
import { UsersContext } from '../../context/users/UsersContext';

const Notification = () => {
    const { authNotification } = useContext(AuthContext)
    const { userNotification } = useContext(UsersContext);
    const { postNotification } = useContext(PostsContext);
    const [className, setClassName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (postNotification) {
            setMessage(postNotification.message)
            setClassName(postNotification.type)
        } else if (userNotification) {
            setMessage(userNotification.message)
            setClassName(userNotification.type)
        } else if (authNotification) {
            setMessage(authNotification.message)
            setClassName(authNotification.type)
        }
        else {
            setClassName('')
        }
    }, [postNotification, userNotification, authNotification])

    return (
        <div className={'notification' + ' ' + className}>
            <h1>{message}</h1>
        </div>
    );
}

export default Notification;

