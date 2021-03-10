import { axios } from "../../core";

const messages = {
    getAllByDialogId: id => axios.get("/messages?dialog=" + id),
    send: data => axios.post("/messages", { text: data.text, dialog_id: data.dialogId, attachments: data.attachments }),
    removeById: id => axios.delete("/messages?id=" + id),
};

export default messages;