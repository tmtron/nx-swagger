# NxSwagger

## init nestjs swagger
* https://docs.nestjs.com/openapi/introduction

`npm install --save @nestjs/swagger swagger-ui-express`

## use nestjs swagger cli plugin
* https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin
* add `apps/oapi/webpack.config.js`
* update `angular.json`
```
{
  "projects": {
    "api": {
      "architect": {
        "build": {
          "builder": "@nrwl/node:build",
          "options": {
            "webpackConfig": "apps/api/webpack.config.js",

```

## example
example code from: https://github.com/nestjs/nest/tree/master/sample/11-swagger/src

## start
* start the server: `npm run start:api`
* start the client: `npm run start`
* open the client: http://localhost:4200
* open the swagger-ui: http://localhost:4200/api/


## Issue
[#902: Typescript Enum array raises CircularDependencyError](
https://github.com/nestjs/swagger/issues/902)

