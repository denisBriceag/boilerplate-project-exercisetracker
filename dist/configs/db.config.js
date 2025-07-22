"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const _entities_1 = require("@entities");
exports.appDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    entities: [_entities_1.User, _entities_1.Exercise],
});
//# sourceMappingURL=db.config.js.map