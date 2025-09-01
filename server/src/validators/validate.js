import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty())
        return next();
    return res.status(422).json({ errors: result.array() });
};
