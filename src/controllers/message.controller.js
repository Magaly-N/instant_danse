import { MessageDB } from "../databases/message.database.js";


const createMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;

    const response = await MessageDB.createMessage(sender, receiver, content);
    const result = response.result;

    return res.status(201).json({ message: "OK", messages: result });
};

const readMessages = async (req, res) => {
    const response = await MessageDB.readMessages();
    const result = response.result;

    return res.status(200).json({ message: "Request OK", messages: result });
};

const readOneMessage = async (req, res) => {
    const messageId = req.params.messageId;

    const response = await MessageDB.readOneMessage(messageId);
    const result = response.result;

    const message = {
        messageId,
        sender: result[0].sender,
        receiver: result[0].receiver,
        content: result[0].content,
        date: result[0].date,
    };

    return res.status(200).json({ message: "Request OK", message });
};

const readAllMessages = async (req, res) => {
    const messageResponse = await MessageDB.readAllMessages();

    const messages = messageResponse.result;

    return res.status(200).json({ message: "OK", messages });
};


const updateMessage = async (req, res) => {
    const { sender, receiver, content, messageId } = req.body;

    const response = await MessageDB.updateMessage(sender, receiver, content, messageId);

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `Message number ${messageId} has been edited` });
};

const deleteOneMessage = async (req, res) => {
    const messageId = req.params.messageId;

    const response = await MessageDB.deleteOneMessage(messageId);

    const error = response.error; // soit string soit null

    if (error) {
        return res.status(500).json({ message: error });
    } else {
        return res.status(200).json({ message: "Message deleted" });
    }
};

export const MessageController = {
    createMessage,
    readMessages,
    readOneMessage,
    readAllMessages,
    updateMessage,
    deleteOneMessage,
};
