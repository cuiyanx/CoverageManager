# CoverageManager
This is unit test coverage report manager.

## Prerequisites
* Open `webpack.config.js` file in the webml-pollyfill object:

    Change:

        module: {rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }]}

    to:

        module: {rules: [{test: /\.js$/, use: {loader: 'babel-loader', options: {plugins: ['istanbul']}}, exclude: /node_modules/}]}

* Open `test/index.html` file in the webml-pollyfill object:

    Change:

      mocha.run(function() {
        window.mochaFinish = true;
      });

    to:

      mocha.run(function() {
        window.mochaFinish = true;

        if (window.__coverage__ !== "undefined" &&
            (window.location.search == "?backend=wasm" ||
             window.location.search == "?backend=webgl")) {
          $.ajax({
            type:"POST",
            url: "http://localhost:8888/json",
            dataType:"json",
            contentType: "application/json",
            data: JSON.stringify(window.__coverage__),
            success: function() {console.log("Sending coverage data is completed!");}
          });
        }
      });

* Open `package.json` file in the webml-pollyfill object:

    Add:

      "babel-plugin-istanbul": "^5.1.0"

    into `devDependencies`.

## Install
```sh
   $ npm install
```

## Start

```sh
$ npm start
```

## Step to run
* Edit `webpack.config.js` and `test/index.html` and `package.json` files in the webml-pollyfill object;
* Build and start the webml-pollyfill object;
* Start CoverageManager sever;
* Open test page in the `chrome` or `chromium` with backend `wasm` or `webgl`;
* Open `http://localhost:8888/` in the `chrome` or `chromium` to check your unit test coverage report.

## Report
**Path**: `object/coverage`
