import { success, notFound } from "../../services/response/";
import { Tutor } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Tutor.create(body)
    .then(tutor => tutor.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tutor.count(query)
    .then(count =>
      Tutor.find(query, select, cursor).then(tutors => ({
        count,
        rows: tutors.map(tutor => tutor.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Tutor.findById(params.id)
    .then(notFound(res))
    .then(tutor => (tutor ? tutor.view() : null))
    .then(success(res))
    .catch(next);

export const showMe = ({ user }, res, next) => {
  const userId = user._id;
  Tutor.find({ user_id: userId })
    .then(notFound(res))
    .then(tutors => {
      if (tutors.length <= 0) return null;
      return tutors[0].view(true);
    })
    .then(success(res))
    .catch(next);
};

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tutor.findById(params.id)
    .then(notFound(res))
    .then(tutor => (tutor ? Object.assign(tutor, body).save() : null))
    .then(tutor => (tutor ? tutor.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Tutor.findById(params.id)
    .then(notFound(res))
    .then(tutor => (tutor ? tutor.remove() : null))
    .then(success(res, 204))
    .catch(next);
