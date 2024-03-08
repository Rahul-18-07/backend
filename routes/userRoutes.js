const express = require('express');
const authControllers = require('../controllers/authControllers');
const userConrollers = require('../controllers/userControllers');
const router = express.Router();

/* Authentication
*/
router.post('/login', authControllers.login);
router.post('/signup', authControllers.uploadUserPhoto, authControllers.signup);



// router.get("/:id/friends", userConrollers.getUserFriends);

router.patch("/:id/:recipeId", userConrollers.addRemoveLiked);
router.patch("/:id/:recipeId", userConrollers.addRemoveMeal);

module.exports = router;