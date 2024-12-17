# Makegood (base-project-quasar-cli)

Makegood Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build

```

### Setup first USER in Postman
```bash
POST : http://localhost:1000/users

BODY:
{
    "email":"admin@kobi.com",
    "password":"123456",
    "first_name":"kobi",
    "last_name":"peretz",
    "roles":["admin"]
}

```


### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
