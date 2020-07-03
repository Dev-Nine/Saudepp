import * as rateLimit from 'express-rate-limit';

const limiter = rateLimit({
   windowMs: 1 * 60 * 1000, 
   max: 10,
   message: {error: 'To many requests'}
})

 export default limiter;