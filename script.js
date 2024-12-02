let editId ="";
let todoList = [];

window.onload = getAll();
async function getAll(){
    try {
        const todos = JSON.parse(localStorage.getItem("todo"));
        if(todos){
            todoList=todos;
        }
        createTbody(todoList);
    } catch (error) {
        console.log(error);
    }
}

function createTbody(data){
    console.log(data);
    const tbodyEl=document.getElementById("tablo");
    tbodyEl.innerHTML="";
    data.reverse();
    data.forEach((content,index) => {
        const row = `<tr>
            <td>
                ${+index+1}
            </td>
            <td>
            ${content.contentType}
            </td>
            <td>
            ${content.name}
            </td>
            <td id="td${index}">
                ${(() => {
                    let stars = "";
                    for (let index = 0; index < content.star; index++) {
                        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
                    }
                    return stars;
                })()}
            </td>
            <td>
            <button class="btn btn-primary" onclick="openEditPage('${content.id}','${content.contentType}','${content.name}','${content.star}')" data-bs-toggle="modal" data-bs-target="#updateModel">Düzenle</button>
            <button class="btn btn-danger" onclick="deleteById('${content.id}')">Sil</button>
            </td>
        </tr>`
        tbodyEl.innerHTML+=row;
    });
    data.reverse();
}

function save(){
    const contentTypeEl = document.getElementById("contentType");
    const nameEl = document.getElementById("name");
    const starEl = document.getElementById("range1");
    const closeBtn = document.getElementById("addModalCloseBtn");
    let id=0;
    if(todoList.length>0)
    while (todoList.some((element) => element.id == id)) {
        id++;
    }
        
    const contents ={
        id:id,
        contentType:contentTypeEl.value,
        name:nameEl.value,
        star:starEl.value
    }
    todoList.push(contents)
    localStorage.setItem("todo",JSON.stringify(todoList));
    contentTypeEl.value="";
    nameEl.value="";
    starEl.value=0;
    closeBtn.click();
    starChange(0);
    getAll();
}

const updateContentTypeEl = document.getElementById("updateContentType");
const updateNameEl = document.getElementById("updateName");
const updateStarEl = document.getElementById("range2");

function openEditPage(id,contentType,name,star){
    updateContentTypeEl.value=contentType;
    updateNameEl.value=name;
    updateStarEl.value=star;
    editId=id;
    starChange(star);
}

function edit(){
    const closeBtn = document.getElementById("updateModalCloseBtn");
    let updateContent = todoList.find(x=>x.id==editId);
    updateContent.contentType=updateContentTypeEl.value;
    updateContent.name=updateNameEl.value;
    updateContent.star=updateStarEl.value;
    localStorage.setItem("todo",JSON.stringify(todoList));

    getAll();
    closeBtn.click();
    editId="";
}

function deleteById(id)
{
    const result = confirm("Bu içeriği silmek istediğinizden emin misiniz?");
    if(result === true)
    {
        debugger;
        let index = todoList.findIndex(x=>x.id==id);
        if(index != -1){
            todoList.splice(index,1);
            localStorage.setItem("todo",JSON.stringify(todoList));
        }
        getAll();
    }
}

let starCount = 0;
function addStar1(){
    const starRange=document.getElementById("range1");
    starCount = starRange.value;
    starChange(starCount);
}

function addStar2(){
    const starRange=document.getElementById("range2");
    starCount = starRange.value;
    starChange(starCount);
}

function starChange(starCount){
    const starDiv=document.getElementById("scoreDiv1");
    const starDiv2=document.getElementById("scoreDiv2");
    starDiv.innerHTML = "";
    starDiv2.innerHTML = "";
    for (let index = 0; index < starCount; index++) {
        starDiv.innerHTML += `<i class="fa-solid fa-star fa-lg" style="color: #FFD43B;"></i>`;
        starDiv2.innerHTML += `<i class="fa-solid fa-star fa-lg" style="color: #FFD43B;"></i>`;
    }
    starCount=0;
}