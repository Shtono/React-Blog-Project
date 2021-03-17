import React, { Component } from 'react';

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

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h2>{this.state.welcome}</h2>
                <br />
                <p>Time: {this.state.date.toLocaleTimeString()}</p>
            </div>
        )
    }
}

export default ChatRooms;