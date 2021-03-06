import '../../../styles/chatrooms.css'
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from '../../../context/auth/AuthContext';
import { db, timestamp } from '../../../firebase';
import ChatLinks from './ChatLinks';
import JsRoom from './rooms/JsRoom';
import ReactRoom from './rooms/ReactRoom';
import SocialRoom from './rooms/SocialRoom';
import TechRoom from './rooms/TechRoom';

class ChatRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            techRoom: null,
            reactRoom: null,
            jsRoom: null,
            socialRoom: null,
            welcome: 'Welcome to our Chatrooms.Down bellow You can find different categoies to choose from.Have fun! :)',
            title: 'Allright Gang!!!'
        }
    }
    static contextType = AuthContext;

    getTechChats(chats) {
        this.setState({ techRoom: chats })
    }
    getReactChats(chats) {
        this.setState({ reactRoom: chats })
    }
    getJsChats(chats) {
        this.setState({ jsRoom: chats })
    }
    getSocialChats(chats) {
        this.setState({ socialRoom: chats })
    }

    setMessage(e) {
        this.setState({ message: { ...this.state.message, body: e.target.value } })
    }

    sendMessage(e) {
        e.preventDefault();
        if (this.state.message.body.trim() !== '') {
            db.collection('chatrooms').add({
                ...this.state.message,
                createdAt: timestamp()
            })
            this.setState({ message: { ...this.state.message, body: '' } })
        } else {
            this.props.setDropdown('error', 'Cannot send an empty messaage')
        }
    }

    dbChatListener(room, callback) {
        const unsubscribe = db.collection('chatrooms')
            .where("room", "==", room)
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => {
                const chatArr = snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                callback(chatArr)
            })
        return unsubscribe;
    }


    render() {
        const { jsRoom, reactRoom, techRoom, socialRoom } = this.state;
        const { currentUser, setDropdown } = this.context;
        const { displayName, uid } = currentUser;
        return (
            <div className="chat-rooms">
                <div className="info">
                    {/* <h1>{this.state.title}</h1> */}
                    <h2>{this.state.welcome}</h2>
                </div>
                <ChatLinks />
                <Switch>
                    <Route exact path="/chatrooms/tech">
                        <TechRoom
                            room='techroom'
                            roomState={techRoom}
                            displayName={displayName}
                            uid={uid}
                            setDropdown={setDropdown}
                            getChats={this.getTechChats.bind(this)}
                            sendMessage={this.sendMessage}
                            setMessage={this.setMessage}
                            listener={this.dbChatListener}
                        />
                    </Route>
                    <Route exact path="/chatrooms/JS">
                        <JsRoom
                            room='jsroom'
                            roomState={jsRoom}
                            displayName={displayName}
                            uid={uid}
                            setDropdown={setDropdown}
                            getChats={this.getJsChats.bind(this)}
                            sendMessage={this.sendMessage}
                            setMessage={this.setMessage}
                            listener={this.dbChatListener}
                        />
                    </Route>
                    <Route exact path="/chatrooms/react">
                        <ReactRoom
                            room='reactroom'
                            roomState={reactRoom}
                            displayName={displayName}
                            uid={uid}
                            setDropdown={setDropdown}
                            getChats={this.getReactChats.bind(this)}
                            sendMessage={this.sendMessage}
                            setMessage={this.setMessage}
                            listener={this.dbChatListener}
                        />
                    </Route>
                    <Route exact path="/chatrooms/social">
                        <SocialRoom
                            room='socialroom'
                            roomState={socialRoom}
                            displayName={displayName}
                            uid={uid}
                            setDropdown={setDropdown}
                            getChats={this.getSocialChats.bind(this)}
                            sendMessage={this.sendMessage}
                            setMessage={this.setMessage}
                            listener={this.dbChatListener}
                        />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default ChatRooms;