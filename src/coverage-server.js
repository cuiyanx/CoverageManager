var express = require("express");
var istanbul = require("istanbul");
var ejs = require("ejs");
var path = require("path");
var fs = require("fs");
var url = require("url");
var bodyParser = require("body-parser");

var reporter = new istanbul.Reporter();
var collector = new istanbul.Collector();
var isCoverageEnabled = true;
var app = express();
var port = 8888;
var fileSizeMaximum = "100mb";
var isExtended = true;
var urlOptions = {
    extended: isExtended,
    limit: fileSizeMaximum
};
var jsonOptions = {limit: fileSizeMaximum};

app.use(bodyParser.urlencoded(urlOptions));
app.use(bodyParser.json(jsonOptions));

var rootPath = path.resolve(__dirname, "..");
var reportTreePath = path.resolve(rootPath, "report-tree");
//var coveragePath = path.resolve(rootPath, "report");
//var JSONPath = path.resolve(reportTreePath, "wasm", "report.json");
if (!fs.existsSync(reportTreePath)) {
    fs.mkdirSync(reportTreePath);
}

app.engine("html", ejs.__express);
app.set("view engine", "html");

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use(express.static(path.resolve(__dirname, "..", "coverage", "lcov-report")));

app.get("/json", function (req, res) {
    res.send("This is interface for receiving data, please do not visit this webpage!");
})

app.post("/json", function (req, res) {
    if (req.get("Content-Type") !== "application/json") {
        return res.status(400).send("Please post an object with content-type: application/json");
    } else {
        collector.add(req.body);
        reporter.add("text");
        reporter.addAll(["lcov", "clover", "json"]);
        reporter.write(collector, false, function() {
            console.log("All reports generated");
        });

        res.json({ok: true});
    }
});

app.listen(port);
