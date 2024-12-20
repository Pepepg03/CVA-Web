

function getstr(str) {
    return str.substring(str.search("src"));
}
function isValid() {
    var url = window.location.href;
    return(url.indexOf("src")!=-1);
}

function getfilename() {
    var url = window.location.href;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    if (filename == "") {
        return "index.html";
    } 

    return filename;
}

function getModuloPercentage(){
    var res=0;

    var files=getFiles();
    var url = window.location.href;
    url=url.substr(url.indexOf("src/"));
    var url_split=url.split('/');
    url_split.shift();

    var numberString; 
    var jsonTmp=files[url_split.shift()];
    var totalLevel=100;
    for(var i=0;i<url_split.length;i++){
        if(jsonTmp.hasOwnProperty(url_split[i])){
            totalLevel=totalLevel/Object.keys(jsonTmp).length;
            if(url_split[i]=="autoevaluacion"){url_split[i]="autoevaluacion7";}
            numberString=parseInt(url_split[i].replace( /^\D+/g, ''));
            if(url_split[i]=="autoevaluacion7"){url_split[i]="autoevaluacion";}
            res+=(numberString-1)*(totalLevel);
            jsonTmp=jsonTmp[url_split[i]];
        }else{
            if(i!=url_split.length-1){break;}
            
            if(url_split[i]==""){url_split[i]="index.html";}
            for(var idtmp in jsonTmp){
                if(jsonTmp[idtmp]==url_split[i]){
                    totalLevel=totalLevel/Object.keys(jsonTmp).length;
                    res+=(idtmp)*(totalLevel);
                    break;
                }
            }
        }
    }
    
    return res.toFixed(2);
}
function getTotalPercentage(){
    var res=0;

    var files=getFiles();
    var url = window.location.href;
    url=url.substr(url.indexOf("src/"));
    var url_split=url.split('/');
    url_split.shift();

    var numberString; 
    var jsonTmp=files;
    var totalLevel=100;
    for(var i=0;i<url_split.length;i++){
        if(jsonTmp.hasOwnProperty(url_split[i])){
            totalLevel=totalLevel/Object.keys(jsonTmp).length;
            if(url_split[i]=="autoevaluacion"){url_split[i]="autoevaluacion7";}
            numberString=parseInt(url_split[i].replace( /^\D+/g, ''));
            if(url_split[i]=="autoevaluacion7"){url_split[i]="autoevaluacion";}
            res+=(numberString-1)*(totalLevel);
            jsonTmp=jsonTmp[url_split[i]];
        }else{
            if(i!=url_split.length-1){break;}
            if(url_split[i]==""){url_split[i]="index.html";}
            for(var idtmp in jsonTmp){
                if(jsonTmp[idtmp]==url_split[i]){
                    totalLevel=totalLevel/Object.keys(jsonTmp).length;
                    res+=(idtmp)*(totalLevel);
                    break;
                }
            }
        }
    }
    return res.toFixed(2);
}

function generatePage(name,count){
    var html="";
    
    if(name=="index.html"){name="";}
    if(count=="Atrás" || count== "Siguiente"){
        html+='<a class="btn btn-default" role="button" href="./'+name+'">';
    }else{
        html+='<a class="btn btn-default" role="button" id="'+(name==""?"index.html":name)+'" href="./'+name+'">';
    }
    html+='<span>'+count+'</span>';
    html+='</a>';
    return html;
}

function getLast(){
    var url = window.location.href;
    url=url.substr(url.indexOf("src/"));
    if(url=="src/modulo1/parte2/tema4/continue6.html"){return "../../../temario";}
    if(url=="src/modulo2/tema4/continue14.html"      ){return "../../temario";}
    if(url=="src/modulo3/autoevaluacion/continue6.html"){return "../../temario";}
    if(url=="src/modulo4/tema10/continue.html"){return "../../../temario";}
    var url_split=url.split('/');
    url_split.pop();
    url_split.pop();
    var res="";var flag=false;
    for(var i=url_split.length-1;i>=0;i--){
        if(url_split[i].indexOf("modulo")!=-1){
            flag=true;
            res+="../";
            break;
        }else{
            res+="../";
        }
    }
    if(!flag){
        res+="temario/";
    }
    return res;
}
function getMovementBar(){
    var res=0;

    var files=getFiles();
    var url = window.location.href;
    url=url.substr(url.indexOf("src/"));
    var url_split=url.split('/');
    url_split.shift();
    var jsonTmp=files;
    var idtmp;
    
    //Get Id
    for(var i=0;i<url_split.length;i++){
        if(!jsonTmp.hasOwnProperty(url_split[i])){
            if(i!=url_split.length-1){break;}
            if(url_split[i]==""){url_split[i]="index.html";}
            for(idtmp in jsonTmp){
                if(jsonTmp[idtmp]==url_split[i]){
                    break;
                }
            }
        }else{
            jsonTmp=jsonTmp[url_split[i]];
        }
    }
    
    var filescount=Object.keys(jsonTmp).length;
    
    var html="";var html_back="";
    var count=0;
    //before button
    if(parseInt(idtmp)-1>=0){
        html_back+=generatePage(jsonTmp[parseInt(idtmp)-1],"Atrás");
    }else{
        html_back+=generatePage(getLast(),"Atrás");
    }
    //before overall max 5
    var rightmax=filescount-1-parseInt(idtmp);
    var leftmax=parseInt(idtmp);
    leftmax=leftmax>=2?2:leftmax;
    leftmax=rightmax>=2?leftmax:4-rightmax;
    
    for(var left=parseInt(idtmp)-1;left>=0 && count<leftmax;left--){
        html=generatePage(jsonTmp[left],left+1)+html;
        count++;
    }
    html=html_back+html;
    // if(getLast().indexOf("temario")==-1){
        html=html+generatePage(jsonTmp[idtmp],parseInt(idtmp)+1);count++;
    // }
    //after overall max 5
    for(var right=parseInt(idtmp)+1;right<filescount && count<5;right++){
        
        html=html+generatePage(jsonTmp[right],right+1);
        count++;
    }
    //after button
    if(parseInt(idtmp)+1<filescount){
        html+=generatePage(jsonTmp[parseInt(idtmp)+1],"Siguiente");
    }else{
        html+=generatePage(getLast(),"Siguiente");
    }

    return html;
}

function getFiles() {
    var files = {
        modulo4: {
            tema1: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
                4: "continue3.html",
            },
            tema2: {
                0: "index.html",
                1: "continue.html",
            },
            tema3: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
            },
            tema4: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
            },
            tema5: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
            },
            tema6: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
            },
            tema7: {
                0: "index.html",
                1: "continue.html",
            },

            tema8: {
                0: "index.html",
                1: "continue.html",
            },
            tema9: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
            },
            tema10: {
                0: "index.html",
                1: "continue2.html",
                2: "continue3.html",
                3: "continue4.html",
                4: "continue5.html",
                5: "continue1.html",
                6: "continue.html",
            },

        },
        modulo3: {
            tema1: {
                0: "index.html",
                1: "continue.html",
            },
            tema2: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
                4: "continue3.html",
                5: "continue4.html",
            },
            tema3: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
            },
            tema4: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
            },
            tema5: {
                0: "index.html",
            },
            tema6: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
            },
            autoevaluacion: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
                4: "continue3.html",
                5: "continue4.html",
                6: "continue5.html",
                7: "continue7.html",
                8: "continue6.html",
            },
        },
        modulo2: {
            tema1: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue3.html",
            },
            tema2: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
            },
            tema3: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
                4: "continue3.html",
            },
            tema4: {
                0: "index.html",
                1: "continue.html",
                2: "continue1.html",
                3: "continue2.html",
                4: "continue3.html",
                5: "continue4.html",
                6: "continue5.html",
                7: "continue6.html",
                8: "continue7.html",
                9: "continue8.html",
                10: "continue9.html",
                11: "continue10.html",
                12: "continue11.html",
                13: "continue13.html",
                14: "continue14.html",
            },

        },
        modulo1: {
            parte1: {
                tema1: {
                    0: "index.html",
                    1: "continue.html",
                    2: "continue1.html",
                    3: "continue2.html",
                    4: "continue3.html",
                },

                tema2: {
                    0: "index.html",
                    1: "continue.html",
                    2: "continue1.html",
                    3: "continue2.html",
                    4: "continue3.html",
                    5: "continue5.html",
                    6: "continue6.html",
                    7: "continue7.html",
                    8: "continue8.html",
                    9: "continue9.html",
                    10: "continue10.html",
                    11: "continue11.html",
                    12: "continue12.html",
                    13: "continue13.html",
                    14: "continue15.html",
                    15: "continue16.html",
                    16: "continue17.html",
                    17: "continue18.html",
                },

                tema3: {
                    0: "index.html",
                    1: "continue.html",
                    2: "continue1.html",
                    3: "continue2.html",
                    4: "continue3.html",
                    5: "continue4.html",
                    6: "continue5.html",
                    7: "continue6.html",
                    8: "continue7.html",
                    9: "continue8.html",
                    10: "continue9.html",
                    11: "continue10.html",
                    12: "continue11.html",
                },
            },
            parte2: {
                tema1: {
                    0: "index.html",
                    1: "continue.html",
                    2: "continue1.html",
                },
                tema2: {
                    0: "index.html",
                    1: "continue.html",
                },
                tema3: {
                    0: "index.html",
                    1: "continue.html",
                    2: "continue1.html",
                    3: "continue2.html",
                    4: "continue3.html",
                    5: "continue4.html",
                    6: "continue5.html",
                    7: "continue6.html",
                    8: "continue7.html",
                },
                tema4: {
                    0: "index.html",
                    1: "continue.html",
                    2: "continue1.html",
                    3: "continue2.html",
                    4: "continue4.html",
                    5: "continue5.html",
                    6: "continue6.html",
                },
            },
        },
    };
    
    return files;
}

function getSpecialLasts() {
    var Lasts = {
        "src/modulo1/parte1/tema1":"../tema2/",
        "src/modulo1/parte1/tema2":"src/modulo1/parte1/tema3/",
        "src/modulo1/parte1/tema3":"src/modulo1/parte2/tema1/",
        "src/modulo1/parte2/tema1":"src/modulo1/parte2/tema2/",
        "src/modulo1/parte2/tema2":"src/modulo1/parte2/tema2/",
        "src/modulo1/parte2/tema3":"src/modulo1/parte2/tema4/",
        "src/modulo1/parte2/tema4":"src/temario/",
    };
    
    return Lasts;
}

$(document).ready(function(){
    if(isValid()){
        
        $(".btn-group").html(getMovementBar()); 
        setTimeout(function(){
            document.getElementById(getfilename()).classList.remove("btn-default");
            document.getElementById(getfilename()).classList.add("btn-actual-page");
        },250);
    
        show(getTotalPercentage()/100); 
        document.getElementsByClassName("progress-bar")[0].innerHTML = getModuloPercentage() + "%";
        document.getElementsByClassName("progress-bar")[0].style.maxWidth = "" + getModuloPercentage() + "%";
        document.getElementsByClassName("progress-bar")[0].style.minWidth = "" + 5 + "%";

    }

});