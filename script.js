import {deleteData, getData, postData, putData} from "./api-client.js";
const listItems = document.getElementsByClassName("list_items")[0];
const addButton = document.getElementById("addTasks_btn");
const todoText = document.getElementById("addTasks_text");

let list = [];

const refreshList = async () => {
    let count = listItems.childNodes.length;
    for (let i = 0 ;i < count ; i++) {
        listItems.removeChild(listItems.childNodes[0]);
    }
    list = await getData();
    console.log(list);
    list.forEach(element => createLi(element,"refresh"));
}   

const createLi = async (element,caller) => {
    
    const li = document.createElement("li");
    const textinput = document.createElement("input");
    textinput.type = "text";
    textinput.value = element.description;
    textinput._id = element._id;
    li.id  = element._id;
    textinput.addEventListener("change", updateHandler);

    const vink = document.createElement("input");
    vink.type = "checkbox";
    vink._id = element._id;
    vink.checked = element.done;
    vink.addEventListener("change", updateHandler);

    const delButton = document.createElement("input");
    delButton.type = "button";
    delButton.value = "";
    delButton._id = element._id;
    delButton.className = "bin";
    delButton.addEventListener("click", removeHandler);
                
    li.append(vink);
    li.append(textinput);
    li.append(delButton);
    if (caller == "addHandler") {
        let description = element.description;
        listItems.append(li);
        const returnData = await postData({"description":description, "done":false});
        const data = await returnData.json();
        li.id = data._id;
        vink._id = data._id;
        delButton._id = data._id;
        textinput._id = data._id;
    }
    else listItems.insertBefore(li,listItems.childNodes[0]);
    if (vink.checked==true){
        textinput.className = "checked";
    }
    else {textinput.className = ""}
}

const addHandler = async (element) => {
    let description = element.target.previousElementSibling.value;
    if (description=="") {
        alert("Please add a task.");
    }
    else {
        todoText.value = "";
        element.description = description;
        createLi(element,"addHandler");
    }
}

const removeHandler = async (e) => {
    const li = document.getElementById(`${e.target._id}`);
    listItems.removeChild(li);
    await deleteData({_id:e.target._id});
}

const updateHandler = async (e) => {
    if (e.target.type=="text"){
        putData({_id:e.target._id, description:e.target.value, done:e.target.previousElementSibling.checked},);
    }
    else {
        putData({_id:e.target._id, description:e.target.nextElementSibling.value, done:e.target.checked, });
        if (e.target.checked==true){
            e.target.nextElementSibling.className = "checked";
        }
        else {e.target.nextElementSibling.className = ""}
    }
}
addButton.addEventListener("click",addHandler);
refreshList();