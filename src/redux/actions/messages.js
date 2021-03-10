import {messagesApi} from '../../utils';
import dialogsActions from './dialogs'
const messagesActions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload:items
    }),
    fetchMessages: dialogId => dispatch => {
        dispatch(messagesActions.setIsLoading(true));
        messagesApi
            .getAllByDialogId(dialogId)
            .then(({ data }) => {
                dispatch(messagesActions.setMessages(data));
                dispatch(messagesActions.newMessage(data));
                
            })
            .catch(() => {
                dispatch(messagesActions.setIsLoading(false));
            });
    },
    fetchSendMessage: (data) => dispatch => {        
        messagesApi.send(data).then(({ data }) => {
            
            // dispatch(messagesActions.addMessage(data));
        })
    },
    addMessage: message => (dispatch, getState) => {
        console.log(message);
        
        const { dialogs } = getState();
        const { currentDialog } = dialogs;
        dispatch(dialogsActions.fetchDialogs())
        
        if (currentDialog === message.dialog._id) {
            dispatch({
                type: "MESSAGES:ADD_MESSAGE",
                payload: message
            });
        }
    },
    setIsLoading: bool => ({
        type: "MESSAGES:SET_IS_LOADING",
        payload: bool
    }),
    removeMessageById: id => dispatch => {
        if (window.confirm("Вы действительно хотите удалить сообщение?")) {
            messagesApi
                .removeById(id)
                .then(({ data }) => {
                dispatch({
                    type: "MESSAGES:REMOVE_MESSAGE",
                    payload: id
                });
                })
                .catch(() => {
                dispatch(messagesActions.setIsLoading(false));
                });
        }
    },
}

export default messagesActions;