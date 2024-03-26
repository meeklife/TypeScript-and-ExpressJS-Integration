"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyValidator = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
function BodyValidator(...keys) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validator, keys, target, key);
    };
}
exports.BodyValidator = BodyValidator;
