import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

import { InputMessage as InputMessageBase } from "../components";
import { messagesActions, attachmentsActions, dialogsActions } from "../redux/actions";
import { filesApi } from "../utils/api";

import socket from '../core/socket'

const InputMessage = (props) => {
    const {
        dialogs: { currentDialog },
        attachments,
        fetchSendMessage,
        fetchDialogs,
        setAttachments,
        addMessage,
        removeAttachment,
        user,
    } = props;
    

    window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

    const [value, setValue] = useState('');
    const [isRecording, setIsRecording] = useState('');
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    };

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                audio: true
            }, onRecording, onError);
        }
    };

    const onRecording = stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
        };

        recorder.onstop = () => {
            setIsRecording(false);
        };

        recorder.ondataavailable = e => {
            const file = new File([e.data], 'audio.webm');

            setLoading(true);

            filesApi.upload(file).then(({data}) => sendAudio(data.file._id));
        };
    };

    const onError = err => {
        console.log('The following error occured: ' + err);
    };

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setShowEmojiPicker(false);
        }
    };

    const addEmoji = ({
        colons
    }) => {
        setValue((value + ' ' + colons).trim());
    };

    const sendAudio = audioId => {
        fetchSendMessage({
            text: null,
            dialogId: currentDialog,
            attachments: [audioId],
        })
        setLoading(false);
    };

    const sendMessage = () => {
        if (isRecording) {
            mediaRecorder.stop();
        } else if (value || attachments.length) {
            
            fetchSendMessage({
                text: value,
                dialogId: currentDialog,
                attachments: attachments.map(file => file.uid),
              })
            setValue('');
            setAttachments([]);
        }
    };

    const handleSendMessage = e => {
        socket.emit('DIALOGS:TYPING', {
            dialogId: currentDialog,
            user
        });
        if (e.keyCode === 13) {
            sendMessage();
        }
    };

    const onHideRecording = () => {
        setIsRecording(false);
    };

    const onSelectFiles = async files => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading',
                },
            ];
            setAttachments(uploaded);
            // eslint-disable-next-line no-loop-func
            await filesApi.upload(file).then(({
                data
            }) => {
                uploaded = uploaded.map(item => {
                    if (item.uid === uid) {
                        return {
                            status: 'done',
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url,
                        };
                    }
                    return item;
                });
            });
        }
        setAttachments(uploaded);
    };

    useEffect(() => {
        const el = document.querySelector('.chat-input__smile-btn');
        document.addEventListener('click', handleOutsideClick.bind(this, el));
        return () => {
            document.removeEventListener('click', handleOutsideClick.bind(this, el));
        };
    }, []);
    
    
    return (
        <InputMessageBase 
            onHideRecording={onHideRecording}
            value={value}
            attachments={attachments}
            onSelectFiles={onSelectFiles}
            onRecord={onRecord}
            isRecording={isRecording}
            addMessage={addMessage}
            handleSendMessage={handleSendMessage}
            emojiPickerVisible={emojiPickerVisible}
            toggleEmojiPicker={toggleEmojiPicker}
            addEmoji={addEmoji}
            sendMessage={sendMessage}
            setValue={setValue}
            fetchSendMessage={fetchSendMessage}
            currentDialogId={currentDialog}
            removeAttachment={removeAttachment}/>
    )
}

export default connect(
    ({ dialogs, attachments, user }) => ({
        dialogs,
        attachments: attachments.items,
        user: user.data,
    }),
    { ...messagesActions, ...attachmentsActions, ...dialogsActions },
)(InputMessage);