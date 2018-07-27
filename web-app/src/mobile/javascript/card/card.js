var odiv = document.getElementById("box");
       var flag = true;
       setInterval(function(){
           if(flag){
               odiv.style.marginBottom = "10px";
               flag = false;
           }else{
               odiv.style.marginBottom = "20px";
               flag = true;
           }
       },300);