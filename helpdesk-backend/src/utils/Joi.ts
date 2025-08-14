import Joi from 'joi';

const th: any = {
    'any.required': 'ไม่พบฟิวด์ {{#label}}',
    'string.base': `{{#label}} ต้องเป็น string'`,
    'string.empty': 'กรุณาระบุ {{#label}}',
    'string.length': 'กรุณาระบุ {{#label}} จำนวน {#limit} ตัวอักษร',
    'number.base': `{{#label}} ต้องเป็น number'`,
    'number.empty': 'กรุณาระบุ {{#label}}',
    'number.length': 'กรุณาระบุ {{#label}} จำนวน {#limit} ตัว',
    'number.min': '{{#label}} ต้องมีค่ามากกว่าหรือเท่ากับ {#limit}',
    'number.max': '{{#label}} ต้องมีค่าน้อยว่าหรือเท่ากับ {#limit}',
    'array.includesRequiredUnknowns': 'กรุณาระบุค่าใน {{#label}}',
    'object.base': '{{#label}} ต้องเป็น object',
    'object.unknown': 'ไม่รู้จักฟิวด์ที่ระบุ {{#label}}',
    'date.base': '{{#label}} ต้องเป็น date',
    'date.format': '{{#label}} ต้องอยู่ในรูปแบบ ISO 8601',
};

const joiErrorMessages = {
    th,
};

const JoiCustom = Joi.defaults(function joiLanguage(schema) {
    return schema.options({
        abortEarly: false,
        messages: joiErrorMessages,
        errors: {
            language: 'th',
        },
    });
});

export default JoiCustom;
