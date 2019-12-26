import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy, showMe } from "./controller";
import { schema } from "./model";
export Tutee, { schema } from "./model";

const router = new Router();
const { user_id, address } = schema.tree;

/**
 * @api {post} /tutees Create tutee
 * @apiName CreateTutee
 * @apiGroup Tutee
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam user_id Tutee's user_id.
 * @apiParam address Tutee's address.
 * @apiSuccess {Object} tutee Tutee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutee not found.
 * @apiError 401 master access only.
 */
router.post("/", master(), body({ user_id, address }), create);

/**
 * @api {get} /tutees/me Retrieve current tutee
 * @apiName RetrieveCurrentTutee
 * @apiGroup Tutee
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} tutee Tutee's data.
 */
router.get("/me", token({ required: true }), showMe);

/**
 * @api {get} /tutees Retrieve tutees
 * @apiName RetrieveTutees
 * @apiGroup Tutee
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tutees.
 * @apiSuccess {Object[]} rows List of tutees.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get("/", token({ required: true }), query(), index);

/**
 * @api {get} /tutees/:id Retrieve tutee
 * @apiName RetrieveTutee
 * @apiGroup Tutee
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} tutee Tutee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutee not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /tutees/:id Update tutee
 * @apiName UpdateTutee
 * @apiGroup Tutee
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user_id Tutee's user_id.
 * @apiParam address Tutee's address.
 * @apiSuccess {Object} tutee Tutee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutee not found.
 * @apiError 401 user access only.
 */
router.put(
  "/:id",
  token({ required: true }),
  body({ user_id, address }),
  update
);

/**
 * @api {delete} /tutees/:id Delete tutee
 * @apiName DeleteTutee
 * @apiGroup Tutee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tutee not found.
 * @apiError 401 admin access only.
 */
router.delete("/:id", token({ required: true, roles: ["admin"] }), destroy);

export default router;
