import React, { Component } from 'react';
import { db, timestamp } from '../../../../firebase';
import ChatWindow from '../ChatWindow';
import SendMessage from '../SendMessage';

class JsRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unsubscribe: null,
            message: {
                body: '',
                room: 'jsroom',
                author: this.props.displayName
            }
        }
    }

    componentDidMount() {
        this.setState({
            unsubscribe: db.collection('chatrooms')
                .where("room", "==", "jsroom")
                .orderBy("createdAt", "desc")
                .onSnapshot(snapshot => {
                    const chatArr = snapshot.docs.map(doc => {
                        return { ...doc.data(), id: doc.id }
                    })
                    this.props.getJsChats(chatArr)
                })
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe();
        console.log('JSRoom unmounted');
    }

    setMessage(e) {
        this.setState({ message: { ...this.state.message, body: e.target.value } })
    }

    sendMessage(e) {
        e.preventDefault();
        db.collection('chatrooms').add({
            ...this.state.message,
            createdAt: timestamp()
        })
    }


    render() {
        return (
            <div>
                <ChatWindow msgArr={this.props.jsRoom} />
                <SendMessage
                    submit={this.sendMessage.bind(this)}
                    value={this.state.message.body}
                    onChange={this.setMessage.bind(this)}
                />
            </div>

        );
    }

}

export default JsRoom;