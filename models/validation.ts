import Joi from "joi";

// validation models
const registerValidation = (data: Joi.ValidationOptions) => {
    const schema = Joi.object({
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().max(30).required(),
        email: Joi.string().min(6).max(40).email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const loginValidation = (data: Joi.ValidationOptions) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(40).email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};

export { registerValidation, loginValidation };
