import { axios } from "../../core";

const dialogs = {
  getAll: () => axios.get("/dialogs"),
  create: ({ partner, text }) => axios.post("/dialogs", { partner, text })
};

export default dialogs;