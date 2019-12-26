import { success, notFound } from "../../services/response/";
import { Tutee } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Tutee.create(body)
    .then(tutee => tutee.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tutee.count(query)
    .then(count =>
      Tutee.find(query, select, cursor).then(tutees => ({
        count,
        rows: tutees.map(tutee => tutee.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const showMe = ({ user }, res, next) => {
  const userId = user._id;
  Tutee.find({ user_id: userId })
    .then(notFound(res))
    .then(tutees => {
      if (tutees.length <= 0) return null;
      return tutees[0].view(true);
    })
    .then(success(res))
    .catch(next);
};

export const show = ({ params }, res, next) =>
  Tutee.findById(params.id)
    .then(notFound(res))
    .then(tutee => (tutee ? tutee.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tutee.findById(params.id)
    .then(notFound(res))
    .then(tutee => (tutee ? Object.assign(tutee, body).save() : null))
    .then(tutee => (tutee ? tutee.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Tutee.findById(params.id)
    .then(notFound(res))
    .then(tutee => (tutee ? tutee.remove() : null))
    .then(success(res, 204))
    .catch(next);
