let input = document.querySelector(".add");
let ul = document.querySelector("ul");

input.addEventListener("keyup",function(event){
    if(event.key=="Enter" && input.value!=""){
        let item = document.createElement("li");
        let checkInp= document.createElement("input");
        checkInp.setAttribute("type","checkbox");
        checkInp.classList.add("check");
        let span = document.createElement("span");
        span.classList.add("checkbox");
        let label=document.createElement("label");
        label.classList.add("main");
        let text = document.createElement("span");
        text.classList.add("text");
        let del = document.createElement("button");
        del.classList.add("delete");
        label.appendChild(checkInp);
        label.appendChild(span);
        label.appendChild(text);
        text.append(input.value);
        item.appendChild(label);
        item.appendChild(del);
        ul.appendChild(item);
        input.value="";

    }    
});

ul.addEventListener("click",function(event){
    if(event.target.nodeName=="BUTTON"){//nodeName:"BUTTON"
    let btn= event.target;
    let par =btn.parentElement;
    par.remove();
}
})

