import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

class MessageItem extends Component {

    render() {
        const { author, body, createdAt } = this.props
        return (
            <div>
                <small>{author}</small>
                <p>{body}</p>
                <small>{createdAt && formatDistanceToNow(createdAt.toDate())}</small>
            </div>
        )
    }
}

export default MessageItem;