import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().pattern(/^\d{11}$/).required(),
    phone: joi.string().pattern(/^\d{10,11}$/).required(),
    birthday: joi.string().pattern(/^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/).required(),
});

export default customerSchema;