import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { AuthContext } from '../../../context/auth/AuthContext'

class MessageItem extends Component {
    static contextType = AuthContext;

    render() {
        const { author, body, createdAt, uid, photo } = this.props;
        const { currentUser } = this.context;
        return (
            <div className={currentUser.uid === uid ? 'message-item user' : 'message-item'}>
                <h5>{author}</h5>
                <p><img src={photo} alt={author} /> <span>{body}</span></p>
                <small>{createdAt && formatDistanceToNow(createdAt.toDate())} ago</small>
            </div>
        )
    }
}

export default MessageItem;