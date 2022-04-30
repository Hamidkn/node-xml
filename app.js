const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const fs = require('fs');

const parser = new xml2js.Parser({
    explicitArray: false,
});

const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

let xmlData = fs.readFileSync('export_full.xml', 'utf8');

function parseXml(xmlData, res, name) {
    parser.parseString(xmlData, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render(name, { Items: result.export_full.items.item });
        }
    });
};

app.route('/')
    .get((req, res) => {
        res.render('index', { Items: null });
    }).post((req, res) => {
        parseXml(xmlData, res, 'index');
    });

app.route('/names')
    .get((req, res) => {
        res.render('names', { Items: null });
    }).post((req, res) => {
        parseXml(xmlData, res, 'names');
    });

app.route('/parts')
    .get((req, res) => {
        res.render('parts', { Items: null });
    }).post((req, res) => {
        parseXml(xmlData, res, 'parts');
    });

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})