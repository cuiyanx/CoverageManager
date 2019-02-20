# CoverageManager
This is unit test coverage report manager.

## Step to run

### Prerequisites

Edit `webpack.config.js` and `package.json` files in the webml-pollyfill object.

* Open `webpack.config.js` file in the webml-pollyfill object:

    Change:

        module: {rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }]}

    to:

        module: {rules: [{test: /\.js$/, use: {loader: 'babel-loader', options: {plugins: ['istanbul']}}, exclude: /node_modules/}]}

* Open `package.json` file in the webml-pollyfill object:

    Add:

      "babel-plugin-istanbul": "^5.1.0"

    into `devDependencies`

* Build and start the webml-pollyfill object.

### Install dependency package for CoverageManager

```sh
$ npm install
```

### Set Configurations

There are three fields in the `config.json`:

   + **_webmlVersion_**: `{string}`, the version of webml-polyfill object
   + **_remoteURL_**: `{string}`, remote test URL.
   + **_browser_**: `{string}`, run test page

### Start CoverageManager

```sh
$ npm start
```

## Report

   + **General report**: `./coverage`
   + **Detailed report**: `./report-tree`

## Support Platforms

|  Linux  |   Mac   |  Android  |  Windows  |
|  :---:  |  :---:  |   :---:   |   :---:   |
|  PASS   |   PASS  |    TODO   |    TODO   |
