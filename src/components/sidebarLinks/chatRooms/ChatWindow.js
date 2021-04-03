import React, { Component } from 'react';
import MessageItem from './MessageItem';

class ChatWindow extends Component {

    render() {
        const { msgArr } = this.props;
        return (
            <div className="chat-window">
                {msgArr && msgArr.map(msg => (
                    <MessageItem key={msg.id} author={msg.author} body={msg.body} createdAt={msg.createdAt} uid={msg.uid} photo={msg.photoUrl} />
                ))}
            </div>
        )
    }
}

export default ChatWindow;