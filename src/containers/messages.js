import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Message as BaseMessage } from '../components';
import { Empty } from 'antd';
import socket from '../core/socket'
import './index.css'

const Messages = ({items, fetchMessages, addMessage, removeMessageById, currentDialogId, user, isLoading}) => {
    const [isTyping, setIsTyping] = useState(false);
    const messagesRef = useRef(null);
    let typingTimeoutId = null;

    const onNewMessage = data => {
        addMessage(data);
    };

    const toggleIsTyping = () => {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
    };

    useEffect(() => {
        socket.on('DIALOGS:TYPING', toggleIsTyping);
    }, []);

    useEffect(() => {
        currentDialogId && fetchMessages(currentDialogId)
        socket.on('SERVER:NEW_MESSAGE', onNewMessage);
        socket.on('SERVER:MESSAGES_READED', fetchMessages);
        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
            socket.removeListener('SERVER:MESSAGES_READED', fetchMessages)
        };
    }, [currentDialogId])    
    

    useEffect(() => {
        console.log(messagesRef);
        if (messagesRef !== null) {
            messagesRef?.current?.scrollTo(0, 999999);
            
        }
        
    }, [items, isTyping]);
    
    console.log(messagesRef);
    
    return (
        <div ref={messagesRef} >
            {items.map(item => (
                <BaseMessage 
                    onRemoveMessage={removeMessageById.bind(this, item._id)}
                    key={item._id}
                    avatar={item?.user?.avatar}
                    user={item.user}
                    text={item.text}

                    addMessage={() => {console.log();}}
                    date={item.createdAt}
                    isMe={user._id === item.user._id}
                    isReaded={item.unread}
                    isTyping={isTyping}
                    attachments={item.attachments}
                    isOnline={item.isOnline}
                    audio={item.audio}
                    id={item._id}
                />
            ))} 

            {items.length === 0 && 
                <Empty description={<p>Выберите диалог</p>}/>
            }

        </div>
    )
};

Messages.defaultProps = {
    user: {},
};
  
Messages.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
    isTyping: PropTypes.bool,
    isOnline: PropTypes.bool,
};


export default Messages;