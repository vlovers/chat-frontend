import React from 'react';
import {connect} from 'react-redux';
import {messagesActions, dialogsActions} from '../redux/actions';
import { axios } from "../core";

import {Dialogs, Messages, InputMessage, Sidebar} from '../containers';
import './index.css';

const Home = (
    {
        messages,
        fetchMessages,
        addMessage,
        removeMessageById,
        fetchDialogs,
        setCurrentDialog,
        currentDialogId,
        dialogs,
        userId,
        fetchUserData,
        user,
        isLoading
    }) => {
        
    const curentDialogData = dialogs.find(dialog => dialog._id === currentDialogId)
    
    return (
        <div className="home__container">
            <div className="side-bar">
                <Sidebar
                    fetchDialogs={fetchDialogs}
                    user={user}
                />
        
                <div className="side-bar__dialogs">
                    <Dialogs
                        fetchDialogs={fetchDialogs}
                        setCurrentDialog={setCurrentDialog}
                        currentDialogId={currentDialogId}
                        dialogs={dialogs}
                        messages={messages}
                        userId={userId}
                        fetchUserData={fetchUserData}
                    />
                </div>
            </div>

            <div className="dialog__wrapp">
                {currentDialogId && 
                    <div className="dialog__wrapp-header">
                        <p className="dialog__wrapp-title">
                            {curentDialogData.partner.fullname}
                        </p>
                        <div className="dialog__wrapp-status">
                            <div className="status-circle" style={curentDialogData.partner.isOnline ? {background:"#00C980"} : {background:"#bfbfbf"}}/>
                            онлайн
                        </div>
                    </div>
                }
                <div className={currentDialogId ? "dialog__wrapp-content" : "dialog__wrapp-content empty"}>
                    <div className="dialog__content">
                        <Messages
                            items={messages}
                            fetchMessages={fetchMessages}
                            addMessage={addMessage}
                            removeMessageById={removeMessageById}
                            currentDialogId={currentDialogId}
                            user={user}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
                {currentDialogId && <InputMessage />}
            </div>
        </div>
    );
};
export default connect(
    ({dialogs, messages, user}) => ({
        currentDialogId: dialogs.currentDialog,
        messages: messages.items,
        user: user.data,
        isLoading: messages.isLoading,
        dialogs: dialogs.items,
        userId: user.data?._id
    }),
    { ...messagesActions, ...dialogsActions },
)(Home);
