import rateLimit from "express-rate-limit";

export const loginnRateLimit = rateLimit({
    windowMs: 3*60*60*1000, // 3 hours
    max: 6,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: "Too many login attempts, please try again later.",
});

export const requestVerificationodeRateLimit = rateLimit({
    windowMs: 60*1000, // 1 minute
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
    message: "Too many verification code requests, please try again later.",
});

export const passwordResetRateLimit = rateLimit({
    windowMs: 60*1000, // 1 minute
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
    message: "Too many password reset requests, please try again later.",
});

export const createPostRateLimit = rateLimit({
    windowMs: 60*60*1000, // 60 minutes
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: "Too many posts created, please try again later.",
});
export const updatePostRateLimit = rateLimit({
    windowMs: 60*60*1000, // 60 minutes
    max: 25,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: "Too many posts updated, please try again later.",
});