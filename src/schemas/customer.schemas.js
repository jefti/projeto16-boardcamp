import joi from 'joi'

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]{10,11}$/).message('O telefone deve conter 10 ou 11 valores numericos').required(),
    cpf: joi.string().length(11).pattern(/^\d+$/).required(),
    birthday: joi.string().isoDate().message('Data informada com formato errado').required()
});