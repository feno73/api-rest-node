const express = require('express');
const fs = require('fs');
const path = require('path');
const jsreport = require('jsreport')();
/* jsreport.use(
    require('jsreport-handlebars')())
    .use(
        require('jsreport-chrome-pdf')())
    .use(
        require('jsreport-templates')()
); */

//const reportRoute = require('../data/cv/cv');
const router = express.Router();

/*TO-DO: Ver como hacer para que levante el template */

router.route('/generar/:name?').get((req, res, next) => {
    if (!req.body.template) {
        return next("Could not parse report template, aren't you missing content type?")
    }
    jsreport.init().then(() => {
        return jsreport.render({
            template: req.body.template
            /*{
                name: 'cv'
                content: fs.readFileSync(path.resolve('../cv-back/data/cv/cv/content.handlebars')),
			    engine: 'handlebars',
			    recipe: 'chrome-pdf'
            }*/,
            data: req.body.data
            //options: req.body.options
        }).then( resp => {
            const data = resp.content;
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-disposition": "attachment;filename=" + "hello",
                "Content-Length": data.length
            });
            res.end(new Buffer(data, "binary"));
        });
    }).catch(err => console.log(err))
});

module.exports = router;