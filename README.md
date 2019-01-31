### My Payments

##### Deploy order

- pull this project from git repository;
- create environment config file in `src/environments` folder (`environment.dev.ts` or `environment.prod.ts`, depending on target stage);
- run corresponding build script (`npm run build:dev` or `npm run build:prod`);
- serve files from `dist` folder by any applicable HTTP-server

##### Config contents description

- `production`: if application should run in production mode;
- `restServerURL`: external address of REST server (backend part of CR Redesign app); on dev this one is `http://api.cr2.dev.cleveroad.com`;
- `frontServerURL`: external address of frontend part of CR Redesign app; on dev this one is `http://cr2.dev.cleveroad.com`;
- `apiVersion`: should remain `v1.0` until other is explicitly stated
