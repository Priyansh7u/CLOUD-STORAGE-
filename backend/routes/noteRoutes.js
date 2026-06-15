const express =
require("express");

const router =
express.Router();

const {
 createNote,
 getNotes
} = require(
 "../controllers/noteController"
);

router.post(
 "/",
 createNote
);

router.get(
 "/",
 getNotes
);

module.exports =
router;