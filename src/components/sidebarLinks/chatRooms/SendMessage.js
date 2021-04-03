import React, { Component } from 'react';

class SendMessage extends Component {
    render() {
        const { submit, value, onChange } = this.props;
        return (
            <form className="send-message" onSubmit={submit}>
                <input type="text"
                    placeholder="Write your message..."
                    value={value}
                    onChange={onChange}
                />
                <button>Send</button>
            </form>
        )
    }
}

export default SendMessage;
