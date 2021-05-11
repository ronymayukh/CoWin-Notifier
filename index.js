const request = require('request');
const { CallInstance } = require('twilio/lib/rest/api/v2010/account/call');

var accountSid = "YOUR TWILIO ACCOUNT SID (Can be found in the Twilio dashboard)"
var authToken = "YOUR TWILIO AUTH TOKEN (Can be found in the Twilio dashboard)"

var client = require('twilio')(accountSid,authToken);

var district_id = 'YUOR DISTRICT ID IN COWIN';
var start_date = 'DATE YOU WANT TO SEARCH FROM TILL 7 DAYS (e.g. 11-05-2021)'
var contactNumberTo = 'NUMBER YOU WANT TO RECEIVE CALL TO (with country code)'
var contactNumberFrom = 'NUMBER YOUR WANT TO CALL FROM (with country code)'

let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+district_id+"&date="+start_date;

let options = {json: true};

function callNumber(){
    clearInterval(timerVariable);
    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml',
        to: contactNumberTo,
        from: contactNumberFrom
    },(error,call)=>{
        if(error){
            console.log(error);
        }else{
            console.log(call.sid);
        }
    })

}


function searchForVaccine(){
    console.log("Search at : "+Date())
    request(url, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };
    
        if (!error && res.statusCode == 200) {
    
            for(var i=0;i<body.centers.length;i++){
                var temp = body.centers[i];
                for(var j=0;j<temp.sessions.length; j++){
                    if(temp.sessions[j].min_age_limit == 18){

                        if(temp.sessions[j].available_capacity >=1 ){
                            console.log(temp.name)
                            console.log(temp.sessions[j].date);
                            console.log(temp.sessions[j].available_capacity);
                            console.log(temp.sessions[j].min_age_limit);
                            console.log(temp.sessions[j].vaccine);
                            console.log("\n\n");

                            callNumber();
                        }

                    }
                
            }
            }
    
    
            
    
    
            
            
        };
    });
}

var timerVariable = setInterval(searchForVaccine,30000);


