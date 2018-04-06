const jsonBody = require("body/json");
var scores = [{ name: "Edwin", score: 50 }, { name: "David", score: 39 }];


var resources = {
    "/IP": "Internet Protocol",
    "/TCP": "Transmission Control Protocol"
};
function sortScores(a, b) {
    return b.score - a.score;
}
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    jsonBody(req, res, function (err, body) {
        let json;
        if (req.method === "GET") {
            if (req.url !== "/scores") {
                res.statusCode = 404;
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/javascript');
                json = resources[req.url] = JSON.stringify(scores);
            }
        }
        else if (req.method === "POST") {
            if (req.url !== "/scores") {
                res.statusCode = 404;
            }
            else {
                res.statusCode = 201;
                scores.push(body);
                scores.sort(sortScores);
                scores.length = 3;
            }

        }
        res.end(json);
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
