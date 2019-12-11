import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { master } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Tutor, { schema } from "./model";

const router = new Router();
const {
  user_id,
  address,
  bio,
  skills,
  pricePerHour,
  tagline,
  rating,
  taughtContract
} = schema.tree;

/**
 * @api {post} /tutors Create tutor
 * @apiName CreateTutor
 * @apiGroup Tutor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam {String} user_id Tutor's user_id.
 * @apiParam {String} [address] Tutor's address.
 * @apiParam {String} [bio] Tutor's bio.
 * @apiParam {String[]} [skills] Tutor's skills.
 * @apiParam {Number} [pricePerHour] Tutor's pricePerHour.
 * @apiParam {String} [tagline] Tutor's tagline.
 * @apiParam {Number} [rating] Tutor's rating.
 * @apiParam {String[]} [taughtContract] Tutor's taughtContract.
 * @apiSuccess {Object} tutor Tutor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutor not found.
 * @apiError 401 master access only.
 */
router.post(
  "/",
  master(),
  body({
    user_id,
    address,
    bio,
    skills,
    pricePerHour,
    tagline,
    rating,
    taughtContract
  }),
  create
);

/**
 * @api {get} /tutors Retrieve tutors
 * @apiName RetrieveTutors
 * @apiGroup Tutor
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tutors.
 * @apiSuccess {Object[]} rows List of tutors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", query(), index);

/**
 * @api {get} /tutors/:id Retrieve tutor
 * @apiName RetrieveTutor
 * @apiGroup Tutor
 * @apiSuccess {Object} tutor Tutor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutor not found.
 */
router.get("/:id", show);

/**
 * @api {put} /tutors/:id Update tutor
 * @apiName UpdateTutor
 * @apiGroup Tutor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam {String} user_id Tutor's user_id.
 * @apiParam {String} [address] Tutor's address.
 * @apiParam {String} [bio] Tutor's bio.
 * @apiParam {String[]} [skills] Tutor's skills.
 * @apiParam {Number} [pricePerHour] Tutor's pricePerHour.
 * @apiParam {String} [tagline] Tutor's tagline.
 * @apiParam {Number} [rating] Tutor's rating.
 * @apiParam {String[]} [taughtContract] Tutor's taughtContract.
 * @apiSuccess {Object} tutor Tutor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tutor not found.
 * @apiError 401 master access only.
 */
router.put(
  "/:id",
  master(),
  body({
    user_id,
    address,
    bio,
    skills,
    pricePerHour,
    tagline,
    rating,
    taughtContract
  }),
  update
);

/**
 * @api {delete} /tutors/:id Delete tutor
 * @apiName DeleteTutor
 * @apiGroup Tutor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tutor not found.
 * @apiError 401 master access only.
 */
router.delete("/:id", master(), destroy);

export default router;
