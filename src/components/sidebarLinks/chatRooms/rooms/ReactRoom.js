import { Component } from 'react';
import { AuthContext } from '../../../../context/auth/AuthContext'
import { db, timestamp } from '../../../../firebase';
import ChatWindow from '../ChatWindow';
import SendMessage from '../SendMessage';

class ReactRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unsubscribe: null,
            message: {
                body: '',
                room: 'reactroom',
                author: this.props.displayName
            }
        }
    }
    static contextType = AuthContext;
    componentDidMount() {
        this.setState({
            unsubscribe: db.collection('chatrooms')
                .where("room", "==", "reactroom")
                .orderBy("createdAt", "desc")
                .onSnapshot(snapshot => {
                    const chatArr = snapshot.docs.map(doc => {
                        return { ...doc.data(), id: doc.id }
                    })
                    this.props.getReactChats(chatArr)
                })
        })
    }
    componentWillUnmount() {
        this.state.unsubscribe();
        console.log('ReactRoom unmounted');
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
                <ChatWindow msgArr={this.props.reactRoom} />
                <SendMessage
                    submit={this.sendMessage.bind(this)}
                    value={this.state.message.body}
                    onChange={this.setMessage.bind(this)}
                />
            </div>
        )
    }
}

export default ReactRoom;