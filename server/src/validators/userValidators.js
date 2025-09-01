import { body, param } from "express-validator";

export const getUserValidator = [param("id").isMongoId()];

export const updateUserValidator = [
    param("id").isMongoId(),
    body("username").optional().trim().notEmpty(),
    body("profilePic").optional().isString()
];
