const User = require('../models/userModel');
var mongoose = require('mongoose');
exports.addRemoveLiked = async (req, res, next) => {
    try {
        const { id, recipeId } = req.params

        console.log(req.params)
        const user = await User.findById(id)

        if (user.meals.includes(recipeId)) {

            user.liked = user.meals.filter((id) => id != recipeId);
        } else {

            user.meals.push(recipeId);
        }

        await user.save({ validateBeforeSave: false });
        res.status(200).json({

            liked: user.liked
        })

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
exports.addRemoveMeal = async (req, res, next) => {
    try {
        const { id, recipeId } = req.params

        console.log(req.params)
        const user = await User.findById(id)

        if (user.meals.includes(recipeId)) {

            user.liked = user.meals.filter((id) => id != recipeId);
        } else {

            user.meals.push(recipeId);
        }

        await user.save({ validateBeforeSave: false });
        res.status(200).json({

            meals: user.meals
        })

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}