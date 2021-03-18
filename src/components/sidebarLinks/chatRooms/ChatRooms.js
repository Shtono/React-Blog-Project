import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
            date: new Date(),
            welcome: 'Welcome to our Chatrooms.Down bellow You can find different categoies to choose from.Have fun! :)',
            title: 'Allright Gang!!!'
        }
    }
    static contextType = AuthContext;

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000)
        console.log('componentDidMount Ran...');
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
        console.log('componentWillUnmount Ran...');
    }

    tick() {
        this.setState({ date: new Date() })
    }

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


    render() {
        const { date, jsRoom, reactRoom, techRoom, socialRoom } = this.state;
        const { currentUser } = this.context;
        const { displayName } = currentUser;
        return (
            <Router>
                <div style={mainStyle}>
                    <div>
                        <h1>{this.state.title}</h1>
                        <h2>{this.state.welcome}</h2>
                        <br />
                        <p>Time: {this.state.date.toLocaleTimeString()}</p>
                    </div>
                    <ChatLinks />
                    <Switch>
                        <Route exact path="/chatrooms/tech">
                            <TechRoom
                                techRoom={techRoom}
                                displayName={displayName}
                                getTechChats={this.getTechChats.bind(this)}
                            />
                        </Route>
                        <Route path="/chatrooms/js">
                            <JsRoom
                                jsRoom={jsRoom}
                                displayName={displayName}
                                getJsChats={this.getJsChats.bind(this)}
                            />
                        </Route>
                        <Route path="/chatrooms/react">
                            <ReactRoom
                                reactRoom={reactRoom}
                                displayName={displayName}
                                getReactChats={this.getReactChats.bind(this)}
                            />
                        </Route>
                        <Route path="/chatrooms/social">
                            <SocialRoom
                                socialRoom={socialRoom}
                                displayName={displayName}
                                getSocialChats={this.getSocialChats.bind(this)}
                            />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default ChatRooms;

const mainStyle = {
    width: '100%',
}
