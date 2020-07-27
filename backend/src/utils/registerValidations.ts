import validator from 'cpf-cnpj-validator'
const Joi = require('@hapi/joi').extend(validator)

const validations = Joi
   .when('registerType', { 
      is: "crp", 
      then: Joi.string().regex(/^[1-9]{2}[/]{1}[1-9]{6}$/).required()
   })
   .when('registerType', { 
      is: "crf", 
      then: Joi.string().regex(/^[1-9]{5}$/).required()
   })
   .when('registerType', { 
      is: "crfa", 
      then: Joi.string().regex(/^[1-9]{2}[.]{1}[1-9]{3}$/).required()
   })
   .when('registerType', { 
      is: "cro", 
      then: Joi.string().regex(/^[1-9]{5}$/).required()
   })
   .when('registerType', { 
      is: "coren", 
      then: Joi.string().regex(/^[1-9]{6}$/).required()
   })
   .when('registerType', { 
      is: "crm", 
      then: Joi.string().regex(/^[1-9]{6}$/).required()
   })
   .when('registerType', { 
      is: "crn", 
      then: Joi.string().regex(/^[1-9]{5}$/).required()
   })
   .when('registerType', { 
      is: "acm", 
      then: Joi.string().regex(/^[1-9]{6}$/).required()
   })
   .when('registerType', { 
      is: "ace", 
      then: Joi.string().regex(/^[1-9]{6}$/).required()
   })
   .when('registerType', { 
      is: "cpf", 
      then: Joi.document().required().cpf()
   })

export default validations;