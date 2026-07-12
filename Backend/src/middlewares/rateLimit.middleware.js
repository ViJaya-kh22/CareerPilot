import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // 10 requests per IP per window
  message: { message: "Too many attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

//for report generation (AI-Gemini)
export const aiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 4,                        // 4 report generations per day per IP
  message: { message: "Daily report generation limit reached." },
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests:true,
  keyGenerator: (req) => req.user?.id || req.ip,
});