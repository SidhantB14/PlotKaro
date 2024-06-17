const Joi = require('joi');
const { number } = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        description: Joi.string().allow('').allow(null),
        area: Joi.number().required().min(0),
        distance: Joi.number().required().min(0),
        approach: Joi.string().allow('').allow(null),
        soil: Joi.string().required(),
        roadlength: Joi.number().required().allow(null),
        natp: Joi.string(),
        direction: Joi.string().allow('').allow(null),
    }).required(),
    deleteImages: Joi.array(),
    
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

