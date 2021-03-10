const initialState ={
    items: [],
    currentDialog: null
}

//es-lint ignore 
const dialogs = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            return{
                ...state,
                items: payload
            }
        case 'DIALOGS:SET_CURRENT_DIALOG':{
            return{
                ...state,
                currentDialog: payload
            }}
        default:
            return state;
        }
};

export default dialogs;