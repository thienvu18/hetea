import { success, notFound, authorOrAdmin } from "../../services/response/";
import { Message } from ".";

export const create = ({ user, bodymen: { body } }, res, next) =>
  Message.create({ ...body, status: "unread", sender: user })
    .then(message => message.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = (
  { user, querymen: { query, select, cursor } },
  res,
  next
) =>
  Message.find(query, select, cursor)
    .populate("sender")
    .populate("receiver")
    .then(messages =>
      messages.filter(
        message =>
          message.sender._id === user._id || message.receiver_id === user._id
      )
    )
    .then(messages => messages.map(message => message.view(true)))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Message.findById(params.id)
    .populate("sender")
    .populate("receiver")
    .then(notFound(res))
    .then(message => (message ? message.view(true) : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Message.findById(params.id)
    .populate("sender")
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "sender"))
    .then(message => (message ? Object.assign(message, body).save() : null))
    .then(message => (message ? message.view(true) : null))
    .then(success(res))
    .catch(next);
