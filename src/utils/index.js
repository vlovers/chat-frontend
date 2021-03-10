import dialogs from './api/dialogs';
import messages from './api/messages';
import user from './api/user';


import convertCurrentTime from './helpers/convertCurrentTime';
import generateAvatarFromHash from './helpers/generateAvatarFromHash';
import validate from './validate';
import openNotification from './helpers/openNotification'



export {
    messages as messagesApi,
    dialogs as dialogsApi,
    user as userApi,

    convertCurrentTime,
    generateAvatarFromHash,
    validate as validateField,
    openNotification
}
