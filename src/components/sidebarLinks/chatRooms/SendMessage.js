import React, { Component } from 'react';

class SendMessage extends Component {
    render() {
        const { submit, value, onChange } = this.props;
        return (
            <form style={formStyle} onSubmit={submit}>
                <input style={formStyle} type="text"
                    placeholder="Write your message..."
                    value={value}
                    onChange={onChange}
                />
                <input style={formStyle} type="submit" value="Send" />
            </form>
        )
    }
}

export default SendMessage;

const formStyle = {
    width: '100%',
    fontSize: '25px',
    padding: '10px',
    marginTop: '10px'
}

