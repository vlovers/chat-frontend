import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import 'emoji-mart/css/emoji-mart.css'
import { Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Picker } from "emoji-mart";
import { UploadField } from "@navjobs/upload";
import { 
    CameraOutlined,
    SendOutlined,
    SmileOutlined,
    AudioOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {UploadFiles} from '../';
import './inputMessage.css'

const InputMessage = ({fetchSendMessage,onRecord, onHideRecording, isRecording, emojiPickerVisible, sendMessage, onSelectFiles, toggleEmojiPicker, handleSendMessage, attachments, removeAttachment, value, setValue, currentDialogId, addEmoji}) => {
    const { TextArea } = Input;
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [minSecond, setMinSecond] = useState(0);

    const startTimer = () => {

        setInterval(() => {
            setMinSecond(minSecond + 1)  
            console.log(minSecond);
                                  
        }, 1000)
    
       // this.stopTimer(timer)
    
    //    .state.stop ? stopTimer(timer) : null
    
      }
    
    // startTimer()


    
    return (
        <div>
            <div className="new-file">
                {attachments.length > 0 && (
                    <div className="chat-input__attachments">
                        <UploadFiles
                            removeAttachment={removeAttachment}
                            attachments={attachments}
                            />
                    </div>
                )}
            </div>
            <div className="new-message__write">
                <div className="new-message__write-input">
                    {isRecording ? (
                        
                        <div>00:04,65</div>
                    ) : (
                        <div className="new-message__smile-btn">
                            <div className="chat-input__emoji-picker">
                                {emojiPickerVisible && (
                                    <Picker onSelect={emojiTag => addEmoji(emojiTag)} set="apple" />
                                )}
                            </div>
                            <SmileOutlined onClick={toggleEmojiPicker}/> 
                        </div>
                    )}
                    {isRecording ? (
                        <div className="chat-input__record-status">
                        <i className="chat-input__record-status-bubble"></i>
                        Recording...
                        <DeleteOutlined 
                            onClick={onHideRecording} 
                            className="stop-recording"
                        />
                        </div>
                    ) : (
                        // <TextArea
                        // onChange={e => setValue(e.target.value)}
                        // onKeyUp={handleSendMessage}
                        // size="large"
                        // placeholder="Введите текст сообщения…"
                        // value={value}
                        // autosize={{ minRows: 1, maxRows: 6 }}
                        // />
                        <Input 
                            // onSendMessage={fetchSendMessage}
                            // currentDialogId={currentDialogId}
                            onChange={(e) => setValue(e.target.value)} 
                            onKeyUp={handleSendMessage}
                            value={value} 
                            placeholder="Введите текст сообщения…" 
                            type="text"/>
                    )}
                </div>
                <div className="new-message__write-btns">
                    {!isRecording && (
                        <UploadField
                            onFiles={onSelectFiles}
                            containerProps={{
                                className: "chat-input__actions-upload-btn"
                            }}
                            uploadProps={{
                                accept: ".jpg, .jpeg, .png, .gif, .bmp",
                                multiple: "multiple"
                            }}
                        >
                            <CameraOutlined />
                        </UploadField>
                    )}
                    <AudioOutlined onClick={onRecord}/>
                    <SendOutlined onClick={sendMessage}/>
                </div>
            </div>
        </div>
    )
};

InputMessage.defaultProps = {
    items: {},
};
  
InputMessage.propTypes = {
    items: PropTypes.array,
};


export default InputMessage;