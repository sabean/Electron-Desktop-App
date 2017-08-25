# my-project

> electron app

### Required installations

#### Server for the storage of the files

``` bash
# Install required release of tusd from https://github.com/tus/tusd/releases/tag/0.7.2 OR clone as follows
git clone git@github.com:tus/tusd.git
cd tusd

# run tusd
go run cmd/tusd/main.go

```

####  Server for the Json Web token authentication

``` bash
# Install the server to authenticate (username: user@kreatize.com password: user)
git clone git@github.com:sabean/server.git
npm start

```

#### Install tus js client

``` bash
# For the resumable upload install tus js client
npm install tus-js-client

```

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[b31b441](https://github.com/SimulatedGREG/electron-vue/tree/b31b44123ad42acac12337c4955df4ead853f0df) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
