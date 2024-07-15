# Job app API

Backend RESTful API for jobs built in Node.js using Express.js & MongoDB

## For Demo

Visit [https://job-app-api-chriscupas.vercel.app/](https://job-app-api-chriscupas.vercel.app/)

## Starting Locally

<p>You need to install atleast version 16.15 on your local machine.</p>

> Install Dependencies

```bash
npm install
```

> Start the app

```bash
npm start
```

## Starting via Docker

<p>Pull the image</p>

```bash
docker pull chriscupas/job-app
```

<p>Run docker</p>

```bash
docker run -d --env-file ./config/config.env -p 3000:3000 chriscupas/job-app
```

> or

<p>Run docker but make sure to use dotenv to fix environment dependencies</p>

```bash
dotenv -- bash -c 'docker run -d --env-file ./config/config.env -p 3000:3000 chriscupas/job-app'
```

## Building locally

<p>Pull the source code then :</p>

<p>Build the Dockerfile</p>

```bash
docker build  -t job_app_api:0.0.1 .
```

<p>Run docker</p>

```bash
docker run -d --env-file ./config/config.env -p 3000:3000 job_app_api:0.0.1
```

## Config.env

Replace all environment variable values with yours.

## Environment Variables

| **ENV**             |  **Description**  |                             **Option**                              |
| ------------------- | :---------------: | :-----------------------------------------------------------------: |
| PORT                |     Node port     |                                3000                                 |
| NODE_ENV            |    environment    |                             prod / dev                              |
| API_ROUTE_V1        |     API route     |                               /api/v1                               |
| DB_LOCAL_URI        | MongoDB Local URI |                 [Info](https://cloud.mongodb.com/)                  |
| DB_URI              |    MongoDB URI    |                 [Info](https://cloud.mongodb.com/)                  |
| GEOCODER_PROVIDER   |     Geocoder      | [Info](https://developer.mapquest.com/documentation/geocoding-api/) |
| GEOCODER_API_KEY    |     Geocoder      | [Info](https://developer.mapquest.com/documentation/geocoding-api/) |
| JWT_SECRET          |    Secret key     |                         _your defined key_                          |
| JWT_EXPIRES_TIME    |    Expire time    |                              _e.g. 7d_                              |
| COOKIE_EXPIRES_TIME |  Cookie exp time  |                              _e.g. 7_                               |
| SMTP_HOST           |     SMTP HOST     |                                                                     |
| SMTP_PORT           |     SMTP PORT     |                                                                     |
| SMTP_EMAIL          |     SMTP USER     |                                                                     |
| SMTP_PASSWORD       |   SMTP PASSWORD   |                                                                     |
| SMTP_FROM_EMAIL     |  SMTP FROM EMAIL  |                                                                     |
| SMTP_FROM_NAME      |  SMTP FROM NAME   |                                                                     |
| MAX_FILE_SIZE       |     FILE SIZE     |                           _e.g. 2000000_                            |
| UPLOAD_PATH         |    UPLOAD PATH    |                       _e.g. ./public/uploads_                       |
