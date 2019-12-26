import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { token } from "../../services/passport";
import { create, index, show, update } from "./controller";
import { schema } from "./model";
export Message, { schema } from "./model";

const router = new Router();
const { receiver, content, status } = schema.tree;

/**
 * @api {post} /messages Create message
 * @apiName CreateMessage
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {User} receiver Message's receiver.
 * @apiParam {String} content Message's content.
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.post(
  "/",
  token({ required: true }),
  body({ receiver, content }),
  create
);

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} messages List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get("/", token({ required: true }), query(), index);

/**
 * @api {get} /messages/:id Retrieve message
 * @apiName RetrieveMessage
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /messages/:id Update message
 * @apiName UpdateMessage
 * @apiGroup Message
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String=unread,read} status Message's status.
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.put("/:id", token({ required: true }), body({ status }), update);

export default router;
