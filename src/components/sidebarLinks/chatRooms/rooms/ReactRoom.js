import { Component } from 'react';
import ChatWindow from '../ChatWindow';
import SendMessage from '../SendMessage';

class ReactRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unsubscribe: null,
            message: {
                body: '',
                room: this.props.room,
                author: this.props.displayName
            }
        }
    }

    componentDidMount() {
        this.setState({
            unsubscribe: this.props.listener(this.props.room, this.props.getChats)
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe();
        console.log(`${this.props.room} unmounted`);
    }

    render() {
        const { roomState, sendMessage, setMessage } = this.props;
        const { message } = this.state;
        return (
            <div>
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

export default ReactRoom;