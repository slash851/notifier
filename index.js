// var fs = require('fs');
const request = require('request');
var stations_html = '';
request('https://www.maltairport.com/weather/detailed-forecast/', { json: true }, (err, res, body) => {
	//console.log('res',res);  	
	const jsdom = require("jsdom");
	const { JSDOM } = jsdom;	
	const dom = new JSDOM(body);
	const stations = ['luqa','benghajsa','dingli','valletta','selmun','bkara'];
	for(var i=0 ; i<stations.length ; i++)
	{
		var stationpoint = 'point '+stations[i];
		var current_station_div = dom.window.document.getElementsByClassName(stationpoint)[0];
		stations_html +=   '<img src="' + current_station_div.getElementsByTagName('img')[0].src +'"> ' + stations[i] + '       ' + current_station_div.getElementsByTagName('p')[0].textContent + '<br>'
	}

    // fs.writeFile("d:\dupsko.txt", body, function(err) {
    // if(err) {
    //     return console.log(err);
    // }
    // console.log("The file 1 was saved!");
// });
});


var http = require('http');

http.createServer(function (req, res) {
    var html = buildHtml(req);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': html.length,
        'Expires': new Date().toUTCString()
    });
    res.end(html);
}).listen(1212);

function buildHtml(req) {
    var header = '';
    var body = stations_html;

    // concatenate header string
    // concatenate body string

    return '<!DOCTYPE html>'
        + '<html><header>' + header + '</header><body style="background: lightgrey">' + body + '</body></html>';
};

console.log("server running on localhost:8080...");