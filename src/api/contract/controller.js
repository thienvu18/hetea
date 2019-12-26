import { success, notFound } from "../../services/response/";
import { Contract } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Contract.create(body)
    .then(contract => contract.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Contract.count(query)
    .then(count =>
      Contract.find(query, select, cursor).then(contracts => ({
        count,
        rows: contracts.map(contract => contract.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Contract.findById(params.id)
    .then(notFound(res))
    .then(contract => (contract ? contract.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Contract.findById(params.id)
    .then(notFound(res))
    .then(contract => (contract ? Object.assign(contract, body).save() : null))
    .then(contract => (contract ? contract.view(true) : null))
    .then(success(res))
    .catch(next);
export const updateStatus = ({ bodymen: { body }, params }, res, next) =>
  Contract.findById(params.id)
    .then(notFound(res))
    .then(contract =>
      contract ? Object.assign(contract, { status: body.status }).save() : null
    )
    .then(contract => (contract ? contract.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Contract.findById(params.id)
    .then(notFound(res))
    .then(contract => (contract ? contract.remove() : null))
    .then(success(res, 204))
    .catch(next);
