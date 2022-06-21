"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const startup_1 = require("./utils/startup");
const port = 3001;
const hostname = 'localhost';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    let st = new startup_1.default();
    app.enableCors();
    await app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
    await st.defaultData();
}
bootstrap();
//# sourceMappingURL=main.js.map