const fs = require('fs');
// variables
const dataPath = './data/option1.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }

        callback();
    });
};


module.exports = {
    // READ
    read_tour : function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else
                res.send(JSON.parse(data));
        });
    },

    // CREATE
        createTour : function (req, res) {

        readFile(data => {

                if (!req.body) return res.sendStatus(500);
                var i = 1;
                for (;data[i]; i++);

                if(!req.body["name"]){
                    res.statusMessage = "missing 'name' attribute";
                    return res.sendStatus(400);
                }
                if(!req.body["type"]){
                    res.statusMessage = "missing 'type' attribute";
                    return res.sendStatus(400);
                }
                if(!req.body["pictures"]){
                    res.statusMessage = "missing 'pictures' attribute";
                    return res.sendStatus(400);
                }
                if( req.body["type"] !=="nature" && req.body["type"] !== "people" ){
                    res.statusMessage = "unallowed type";
                    return res.sendStatus(400);
                }

                data[i] = {
                    "name": req.body["name"],
                    "type": req.body["type"],
                    "pictures": {}
                }


                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('The new album was added');
                });
            },
            true);
    },


    // UPDATE
        updateTour : function (req, res) {

        readFile(data => {

                var albumId = req.params["id"];
                if(!albumId || !req.body){
                    res.statusMessage = "Bad request";
                    return res.sendStatus(400);
                }
                if (!data[albumId]){
                    res.statusMessage = "album was not found";
                    return res.sendStatus(404);
                }
                if(!req.body["name"]){
                    res.statusMessage = "missing 'name' attribute";
                    return res.sendStatus(400);
                }
                if(!req.body["photographer"]){
                    res.statusMessage = "missing 'photographer' attribute";
                    return res.sendStatus(400);
                }
                if(!req.body["link"]){
                    res.statusMessage = "missing 'link' attribute";
                    return res.sendStatus(400);
                }


                var id = 1;
                var nextId = "PIC" + id;
                while(Object.keys(data[albumId]["pictures"]).includes(nextId))
                    nextId=("PIC"+(id++))


                data[albumId].pictures[nextId] = {
                    "name": req.body["name"],
                    "link": req.body["link"],
                    "photographer": req.body["photographer"],
                    "id" : nextId
                };



                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('new photo added');
                });
            },
            true);
    },


    // DELETE
        deleteTour: function (req, res) {
        readFile(data => {

                var albumId = req.params["id"];
                if(!albumId){
                    res.statusMessage = "Bad request";
                    return res.sendStatus(400);
                }
                // delete an album
                if (!data[albumId]){
                    res.statusMessage = "album was not found";
                    return res.sendStatus(400);
                }

                delete data[albumId];

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`albums id:${albumId} was removed`);
                });
            },
            true);
    }





};
