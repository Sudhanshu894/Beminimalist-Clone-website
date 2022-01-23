
function getData(obj){
    var obj=JSON.parse(obj);
    console.log(obj)
  if(obj.value=="wrong"){ 
  var popup= document.getElementById("popup"); 
  popup.style.display="inline-block"; 
  }            
  }
