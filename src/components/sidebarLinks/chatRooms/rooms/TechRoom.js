import { Component } from 'react';
import { UsersContext } from '../../../../context/users/UsersContext';
import ChatWindow from '../ChatWindow';
import SendMessage from '../SendMessage';

class TechRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unsubscribe: null,
            message: {
                body: '',
                room: this.props.room,
                author: this.props.displayName,
                uid: this.props.uid
            }
        }
    }
    static contextType = UsersContext;
    componentDidMount() {
        this.setState({
            unsubscribe: this.props.listener(this.props.room, this.props.getChats),
            message: { ...this.state.message, photoUrl: this.context.currentUserInfo.imageUrl }
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    render() {
        const { roomState, sendMessage, setMessage } = this.props;
        const { message } = this.state;
        return (
            <div className="room">
                <ChatWindow msgArr={roomState} />
                <SendMessage
                    submit={sendMessage.bind(this)}
                    value={message.body}
                    onChange={setMessage.bind(this)}
                />
            </div>
        )
    }
}

export default TechRoom;