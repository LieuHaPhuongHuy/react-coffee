window.addEventListener("load", ()=>{
    if(localStorage.getItem("toggle")){
        if(localStorage.getItem("toggle") === "true"){
            navbar.style.display="flex"
        }
        else{
            navbar.style.display="none"
        }
     }
     else {
        localStorage.setItem("toggle", "true")
     }
})

function toggleNav(e){
const navbar = document.querySelector("#navbar")
if(localStorage.getItem("toggle") === "false"){
     navbar.style.display="flex"
     localStorage.setItem("toggle", "true")
}
else{
     navbar.style.display="none"
     localStorage.setItem("toggle", "false")
}
}

