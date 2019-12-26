import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { token } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Contract, { schema } from "./model";

const router = new Router();
const { tutor, tutee, hours, price, startDate, endDate, status } = schema.tree;

/**
 * @api {post} /contracts Create contract
 * @apiName CreateContract
 * @apiGroup Contract
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} tutor Contract's tutor.
 * @apiParam {String} tutee Contract's tutee.
 * @apiParam {Number} [hours] Contract's hours.
 * @apiParam {Number} [price] Contract's price.
 * @apiParam {Date} [startDate] Contract's startDate.
 * @apiParam {Date} [endDate] Contract's endDate.
 * @apiParam {String=created,confirmed,done} [status=created] Contract's status.
 * @apiSuccess {Object} contract Contract's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contract not found.
 * @apiError 401 user access only.
 */
router.post(
  "/",
  token({ required: true }),
  body({ tutor, tutee, hours, price, startDate, endDate, status }),
  create
);

/**
 * @api {get} /contracts Retrieve contracts
 * @apiName RetrieveContracts
 * @apiGroup Contract
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of contracts.
 * @apiSuccess {Object[]} rows List of contracts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get("/", token({ required: true }), query(), index);

/**
 * @api {get} /contracts/:id Retrieve contract
 * @apiName RetrieveContract
 * @apiGroup Contract
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} contract Contract's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contract not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /contracts/:id Update contract
 * @apiName UpdateContract
 * @apiGroup Contract
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} tutor Contract's tutor.
 * @apiParam {String} tutee Contract's tutee.
 * @apiParam {Number} [hours] Contract's hours.
 * @apiParam {Number} [price] Contract's price.
 * @apiParam {Date} [startDate] Contract's startDate.
 * @apiParam {Date} [endDate] Contract's endDate.
 * @apiParam {String=created,confirmed,done} [status=created] Contract's status.
 * @apiSuccess {Object} contract Contract's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contract not found.
 * @apiError 401 user access only.
 */
router.put(
  "/:id",
  token({ required: true }),
  body({ tutor, tutee, hours, price, startDate, endDate, status }),
  update
);

/**
 * @api {delete} /contracts/:id Delete contract
 * @apiName DeleteContract
 * @apiGroup Contract
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Contract not found.
 * @apiError 401 admin access only.
 */
router.delete("/:id", token({ required: true, roles: ["admin"] }), destroy);

export default router;
