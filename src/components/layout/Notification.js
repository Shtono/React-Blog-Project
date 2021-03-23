import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { PostsContext } from '../../context/posts/PostsContext';
import { UsersContext } from '../../context/users/UsersContext';

const Notification = () => {
    // const { authNotification } = useContext(AuthContext)
    // const { userNotification } = useContext(UsersContext)
    const { postNotification } = useContext(PostsContext)
    const [className, setClassName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // if (authNotification) {
        //     setMessage(authNotification.message)
        //     setClassName(authNotification.type)
        // }
        // if (userNotification) {
        //     setMessage(userNotification.message)
        //     setClassName(userNotification.type)
        // }
        if (postNotification) {
            setMessage(postNotification.message)
            setClassName(postNotification.type)
        } else {
            setClassName('')
        }
    }, [postNotification])
    // }, [authNotification, userNotification, postNotification])

    return (
        <div className={'notification' + ' ' + className}>
            <h1>{message}</h1>
        </div>
    );
}

export default Notification;

// const style = {
//     position: 'fixed',
//     top: '150px',
//     left: '50%',
//     width: '250px',
//     height: '75px',
//     backgroundColor: 'green',
//     color: '#ccc',
//     textAlign: 'center'
// }