import React, {useState, useEffect} from 'react';

import {Dialog as BaseDialogs} from '../components';
import {userActions} from '../redux/actions';
import socket from '../core/socket'


const Dialogs = ({fetchDialogs, setCurrentDialog, currentDialogId, dialogs, userId, fetchUserData}) => {
    const [inputValue, setInputValue] = useState('');
    const [filtred, setFiltredItems] = useState(Array.from(dialogs));
    
    const onChangeInput = value => {
        setFiltredItems(
            dialogs.filter(
                dialog =>
                    dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );
        setInputValue(value);
    };
    

    useEffect(() => {
        userActions.fetchUserData()

        
        if (!dialogs.length) {
            fetchDialogs();
        } else {            
            setFiltredItems(dialogs);
        }
        
        socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
        socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
        socket.on('SERVER:MESSAGES_READED', fetchDialogs);
        return () => {
            socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
            socket.removeListener('SERVER:MESSAGES_READED', fetchDialogs);
            socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs);
        };
    }, [dialogs]);

    

    return (
        <BaseDialogs
            items={filtred}
            onSearch={onChangeInput}
            inputValue={inputValue}
            userId={userId}
            onSelect={setCurrentDialog}
            currentDialogId={currentDialogId}
        />
    )
}

export default Dialogs;
