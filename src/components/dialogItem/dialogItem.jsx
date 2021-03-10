import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import './dialogItem.css';
import IconReaded from '../iconReaded';
import generateAvatarFromHash from '../../utils/helpers/generateAvatarFromHash'
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';


const getMessageTime = created_at => {
    
    if (isToday(created_at)) {
        return format(created_at, "HH:mm");
    } else {
        return format(created_at, "dd.MM.yyyy");
    }
};

const renderLastMessage = (message, userId) => {
    let text = '';
    if (!message.text && message.attachments.length) {
        text = 'прикрепленный файл';
    } else {
        text = message.text;
    }

    
    return `${message.user._id === userId ? 'Вы: ' : ''}${text}`;
};

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    }
}))(Badge);

const useStyles = makeStyles(() => ({
    messageBuddle: {
        backgroundColor: '#4CA5FF',
        background: '#3674FF',
        boxShadow: '0px 5px 5px rgba(54, 116, 255, 0.196733)',
        borderRadius: '12px 12px 12px 0px',
        padding: '13px 17px',
        maxWidth: '400px'

    }, 
    messageTop: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    messageText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#202020',
        mixBlendMode: 'normal',
        opacity: '0.4',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '220px',
    },
    messageDate: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#202020',
        mixBlendMode: 'normal',
        opacity: '0.4',
        display: 'block'

    },
    Avatar: {
        width: '30px',
        height: '30px',
    },
    messageIsMe: {
        marginBottom: '15px'
    },
    message: {
        marginBottom: '15px'
    }

}));


const DialogItem = ({user, userName, lastMessage, date, userId, isMe, isTyping, onSelect, id, active, newMessage = 0, currentDialogId}) => {    
    const classes = useStyles();
    const { color, colorLighten } = generateAvatarFromHash(user._id);
    
    console.log(isMe);
    
    return (
        <div
            onClick={onSelect.bind(this, id)}
            className={classNames("dialog__item d-flex", {
                "active": active,
                "dialog__item-typing": isTyping,
                "dialog-select__item": currentDialogId === id
            })
        }>

        <StyledBadge
            overlap="circle"
            anchorOrigin={{
            vertical: 'bottom', 
            horizontal: 'right',
            }}
            variant={user.isOnline ? "dot" : "standard"}>
            <Avatar 
                alt={user.fullname} 
                src={user.avatar} 
                style={{background: !user.avatar && `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}}
            />
            {/* {!avatar } */}
        </StyledBadge>

        <div className="dialog__item-content">
            <div className="d-flex dialog__item-content__top">
                <p className="dialog__item-name">
                    {userName}
                </p>
                <span className={isMe ? "dialog__item-is-me " + classes.messageDate : classes.messageDate}>
                    {!isTyping && getMessageTime(new Date(date))}
                </span>
            </div>
            <div className="d-flex dialog__item-content__bottom">
                <p className={classes.messageText + " d-flex"}>
                    {renderLastMessage(lastMessage, userId)}
                    {/* {reactStringReplace(lastMessage.text, /:(.+?):/g, (match, i) => (
                        <Emoji key={i} emoji={match} set="apple" size={16} />
                    ))} */}
                </p>
                <IconReaded isReaded={lastMessage.unread} isMe={isMe}/>
                {!isMe && newMessage > 0 && <span className={newMessage < 10 ? "dialog__item-new-message" : "dialog__item-new-message more"}>{
                    newMessage < 10 ? newMessage : "9+"
                }</span>}
            </div>
        </div>

        </div>
    );
};

DialogItem.defaultProps = {
    user: {},
    lastMessage: '',
    avatar: ''
};
  
DialogItem.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
    isTyping: PropTypes.bool,
    newMessage: PropTypes.number,
    isOnline: PropTypes.bool,
};


export default DialogItem;


