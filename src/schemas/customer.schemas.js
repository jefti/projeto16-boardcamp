import joi from 'joi'

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().length(11).pattern(/^\d+$/).required(),
    birthday: joi.string().isoDate().required()
});