import { Component } from 'react';
import { AuthContext } from '../../../../context/auth/AuthContext'
import { db, timestamp } from '../../../../firebase';
import ChatWindow from '../ChatWindow';
import SendMessage from '../SendMessage';

class TechRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unsubscribe: null,
            message: {
                body: '',
                room: 'techroom',
                author: this.props.displayName
            }
        }
    }
    static contextType = AuthContext;
    componentDidMount() {
        this.setState({
            unsubscribe: db.collection('chatrooms')
                .where("room", "==", "techroom")
                .orderBy("createdAt", "desc")
                .onSnapshot(snapshot => {
                    const chatArr = snapshot.docs.map(doc => {
                        return { ...doc.data(), id: doc.id }
                    })
                    this.props.getTechChats(chatArr)
                })
        })
    }
    componentWillUnmount() {
        this.state.unsubscribe();
        console.log('TechRoom unmounted');
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
                <ChatWindow msgArr={this.props.techRoom} />
                <SendMessage
                    submit={this.sendMessage.bind(this)}
                    value={this.state.message.body}
                    onChange={this.setMessage.bind(this)}
                />
            </div>
        )
    }
}

export default TechRoom;