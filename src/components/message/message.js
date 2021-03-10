import React, {useRef, useState, useEffect} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Emoji } from 'emoji-mart';
import audioStatus from '../../assets/img/audio.svg';
import audioPause from '../../assets/img/audioPause.svg';
import audioPlay from '../../assets/img/audioPlay.svg';
import reactStringReplace from 'react-string-replace';
import { Popover, Button, Modal } from 'antd';

import './message.css';
import IconReaded from '../iconReaded';
import convertCurrentTime from '../../utils/helpers/convertCurrentTime'
import Time from '../time';

import generateAvatarFromHash from '../../utils/helpers/generateAvatarFromHash'


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
        color: '#FFFFFF',
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
        marginLeft: '42px',
        marginTop: '8px',
        display: 'block'

    },
    messageAvatar: {
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



const Message = ({avatar, blockRef, currentDialog, user, id, text, date, isMe, isReaded, isTyping, onRemoveMessage, attachments, isOnline, audio}) => {
    
    const { color, colorLighten } = generateAvatarFromHash(id);
    const classes = useStyles();

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [hoverMessageId, setHoverMessageId] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const audioElem = useRef(null);

    
    useEffect(() => {
        audioElem.current && audioElem.current.addEventListener('playing', () => {
            setIsPlaying(true)
        }, false);
        audioElem.current && audioElem.current.addEventListener('ended', () => {
            setIsPlaying(false)
            setProgress(0)
            setCurrentTime(0)
        }, false);
        audioElem.current && audioElem.current.addEventListener('pause', () => {
            setIsPlaying(false)
        }, false);
        audioElem.current && audioElem.current.addEventListener('timeupdate', () => {
            const duration = audioElem.current && audioElem.current.duration;
            setCurrentTime(audioElem.current && audioElem.current.currentTime);
            setProgress((( audioElem.current && audioElem.current.currentTime / duration) * 100));
        }, false);
    }, [])
    

    const togglePlay = () => {
        if(!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }

    const isAudio = () => {
        return attachments.map(att => {return att.ext === 'webm'})[0]
    }
   
    
    return (
        <div className={classNames("message message__images", {
                "message__is-me": isMe,
                "message__is-typing": isTyping,
                "message__image": attachments && attachments.length === 1,
                "message__images": attachments && attachments.length > 2,
                "message__audio":  attachments.map(att => {
                    return att.ext === 'webm'
                })
            })}>
            <div className={`${classes.messageTop} message-top` }>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    variant={!isMe && isOnline ? "dot" : "standard"}>
                    <Avatar alt={`Avatar ${text}`} src={avatar} style={{background: !user.avatar && `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}} className={classes.messageAvatar}/>
                </StyledBadge>
                <div className="message__content">
                    <div 
                        className={classNames({
                            [classes.messageBuddle + ' massage__is-me-buddle']: (attachments && text) || text || isAudio(),
                            "typing-indicator" : isTyping,
                            "message__audio-buddle d-flex": isAudio()
                        })}>
                        {!isTyping && text && 
                            <p className={classes.messageText}>
                            {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                                <Emoji key={i} emoji={match} set="apple" size={16} />
                            ))}
                            </p>
                        }
                        
                        {isTyping &&
                            <>
                                <span/>
                                <span/>
                                <span/>
                            </>
                        }

                        {attachments.map((attachment, index) => (attachment.ext === 'webm' && (
                            <>
                                <audio 
                                    ref={audioElem} 
                                    src={attachment.url} 
                                    preload="auto"/>
                                <div 
                                    className="audio__progress" 
                                    style={{width: progress + '%'}}/>

                                    <div style={{zIndex: 10}} onClick={togglePlay} className="audio__status-button">
                                        <img src={!isPlaying ? audioPlay : audioPause} alt="audio pause"/>
                                    </div>
                                    <img style={{zIndex: 10}} src={audioStatus} alt="audio status"/>
                                    <span style={{zIndex: 10}} className="audio__time">{convertCurrentTime(currentTime)}</span>

                            </>
                        )))}

                    </div>
                    <div className="d-flex">
                    {attachments && attachments.map((attachment, index) => (
                        attachment.ext !== 'webm' && (
                            <>
                            <img  
                                onClick={showModal}
                                className="message__attachment" 
                                src={attachment.url} 
                                alt={attachment.filename} 
                                key={index}/>
                            <Modal visible={isModalVisible}onCancel={handleCancel} footer={null}>
                            <img  
                                className="message__attachment-big" 
                                src={attachment.url} 
                                alt={attachment.filename} 
                                key={index}/>
                            </Modal>
                        </>
                        )
                    ))}
                    </div>
                </div>

                <div className={hoverMessageId === id && "message-left"}>
                {/* {<div onClick={() => console.log(999)} className="message-more">...</div>} */}
                <Popover
                className="message-more"
                content={
                    <div>
                    <Button onClick={onRemoveMessage}>Удалить сообщение</Button>
                    </div>
                }
                trigger="click">
                <div className="message__icon-actions">
                    <Button type="link" shape="circle">
                        ...
                        </Button>
                </div>
                </Popover>
                <IconReaded isMe={isMe} isReaded={isReaded}/>
                </div>

            </div>
                <span className={isMe ? "message__time-is-me " + classes.messageDate : classes.messageDate}>
                    {!isTyping && <Time date={date}/>}
                </span>

        </div>
    );
};

Message.defaultProps = {
    user: {},
};
  
Message.propTypes = {
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


export default Message;