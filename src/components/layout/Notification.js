import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { PostsContext } from '../../context/posts/PostsContext';
import { UsersContext } from '../../context/users/UsersContext';
import success from '../../assets/notification-success.gif'
import error from '../../assets/notification-error.gif'

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

    const setImg = (className) => {
        if (className === 'success') {
            return success
        } else if (className === 'error') {
            return error
        } else {
            return ''
        }
    }

    return (
        <div className={'notification' + ' ' + className}>
            <img src={setImg(className)} alt="" />
            <h1>{message}</h1>
        </div>
    );
}

export default Notification;

