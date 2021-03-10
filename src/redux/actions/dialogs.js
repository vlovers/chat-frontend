import {dialogsApi} from '../../utils';

const dialogsActions = {
    setDialogs: items => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: items
    }),
    fetchDialogs: () => dispatch => {
        console.log('fsdfmaklsdmkl');
        
        dialogsApi.getAll().then(({data}) => {
            dispatch(dialogsActions.setDialogs(data ? data : []));            
        })
    }, 
    setCurrentDialog: id => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG',
        payload: id
    })
}

export default dialogsActions;