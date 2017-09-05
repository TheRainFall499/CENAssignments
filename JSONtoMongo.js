'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri, {
   useMongoClient: true 
});
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
//create array of entries from JSON
var jsonList = JSON.parse(fs.readFileSync('listings.json', 'utf8'));
jsonList = jsonList["entries"];

//loop through array and store the entries to the database
for(var x = 0;x<jsonList.length;x++){
    //each entry has at least a code and a name
    var entry = new Listing({
        code: jsonList[x].code,
        name: jsonList[x].name
    });
    
    //if the entry also has coordinates
    if(jsonList[x].hasOwnProperty('coordinates')){
        entry.coordinates.latitude = jsonList[x].coordinates.latitude;
        entry.coordinates.longitude = jsonList[x].coordinates.longitude;
    }
    
    //if the entry also has an address
    if(jsonList.hasOwnProperty('address')){
        entry.address = jsonList[x].address;
    }
    
    //finally the filled out entry is saved, with an error check thrown in just in case
    entry.save(function(err){
        if(err){
            throw err;
        }
    });
}
/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */