import React, { Component } from 'react';

class SendMessage extends Component {
    render() {
        const { submit, value, onChange } = this.props;
        return (
            <form onSubmit={submit}>
                <input type="text"
                    placeholder="Write your message..."
                    value={value}
                    onChange={onChange}
                />
                <input type="submit" value="Send" />
            </form>
        )
    }
}

export default SendMessage;
