fs = require('fs')
fs.readFile('../csv/Table1.3_g20_2013.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  else{
  var lines=data.trim().split("\n");

  var result = [];
  var headers=lines[0].trim().split(",");

  for(var i=1;i<lines.length-2;i++){
    var obj = {};
	  var currentline=lines[i].trim().split(",");
    obj["country_name"]=currentline[0];
		obj["gdp"] = parseFloat(currentline[9]);
    result.push(obj);
  }
  var plotdata={
    "GDP_DATA":result
  }
  //  console.log(JSON.stringify(result,null,4)); //JSON

   fs.writeFile("../json/gdpdata.json", JSON.stringify(plotdata, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to gdpdata.json");
    }
});
      }

});
