// HOW TO USE THIS STATUS CODE CHECKER
/*
 * REPLACE "URL" OR "IP" WITH THE CELL YOU WANT TO CHECK
 * getStatus(url) - returns HTTP response code
 * getIP(ip) - returns location info for an IP address
 * 
 * EXAMPLE:
 * =getStatus(a2)
 */
function getStatus(url, followredirect)
{
    
  if (!url) return "";
  
  followredirect = followredirect? true : false; 
  
  var response,code; 
  
  try{
   
    response = UrlFetchApp.fetch(url, {muteHttpExceptions: true, followRedirects: followredirect });
    code     = response.getResponseCode();
    for(i in response) {
      var content = response[i];
      if (content.length < 200){
        Logger.log(i + ": " + response[i]);
      }
    }
    
  }catch(e){
  
    return "Error: " + e;
  
  }
  
  if (code == 200) 
    return "Page Works: Response (" + code + ")"; 
  else
    return "URL Issue: Response (" + code + ")";
  
}


function runIP(){
  var ip = "8.8.8.8"
  Logger.log(getIP(ip))

}

function getIP(ip){

  ip = ip ? ip : false;

  var response,code; 
  
  try{
    
    if (ip){
    
      var url = "https://ipinfo.io/" + ip + "/json";
      Logger.log(url)
    
    }else{
    
      var url = "https://ipinfo.io/json";
    
    }
    response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    page     = response.getContentText();
    data     = JSON.parse(page)
    code     = response.getResponseCode();
    
  }catch(e){
  
    return "Error: " + e;
  
  }
  
  if (code == 200) 
    return "IP: " + data.ip + " Location: " + data.city + ", " + data.region + " " + data.postal; 
  else
    return "URL Issue: Response (" + code + ")";



}


