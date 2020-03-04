/*Делаем вкладки */
function openTab(evt, tableName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tableName).style.display = "table";
    evt.currentTarget.className += " active";

    let arr = document.getElementById(tableName).getElementsByTagName("tr");
    for (i = 0; i < arr.length; i++) {
        arr[i].style.background = "white";
        arr[i].style.border="1px solid grey";
    }
    document.getElementById("fio").textContent=" ";
    document.getElementById("age").textContent=" ";
    document.getElementById("diagnosis").textContent=" ";
}

/*Считываем данные с json presentList */
(async function(){
    const url="https://api.myjson.com/bins/145fmm";
    const x = await fetch(url).then(x=>x.json());
    let j = 0;
    x.forEach(y =>{
        j++;
        let tr = document.createElement("tr");
        tr.setAttribute('onclick', "getInfoPresent(event)");
        tr.innerHTML = `<td>${j}</td><td>${y.firstName+" "+y.lastName+" "+ y.patrName}</td><td>${y.bedNumber}</td>`;
        document.getElementById("present").querySelector("tbody").append(tr);
    });
    document.getElementById("tab-present").textContent=`ПРИСУТСТВУЮТ(${j})`;

}());

/*Считываем данные с json quittingList */
(async function(){
    const url="https://api.myjson.com/bins/1g4glq";
    const x = await fetch(url).then(x=>x.json());
    let j = 0;
    x.forEach(y =>{
        j++;
        let tr = document.createElement("tr");
        tr.setAttribute('onclick', "getInfoQuitting(event)");
        tr.innerHTML = `<td>${j}</td><td>${y.firstName+" "+y.lastName+" "+ y.patrName}</td><td>${y.cause}</td>`;
        document.getElementById("quitting").querySelector("tbody").append(tr);
    });
    document.getElementById("tab-quitting").textContent=`ВЫБЫВШИЕ(${j})`;
}());

/*----Подгружение информации при клике на пациента */
async function getInfoPresent(e){
    const url="https://api.myjson.com/bins/145fmm";
    const x = await fetch(url).then(x=>x.json());
    
    let arr = document.getElementById("present").getElementsByTagName("tr");
    for (i = 0; i < arr.length; i++) {
        arr[i].style.background = "white";
        arr[i].style.border="1px solid grey";
    }
    
    let parent = e.target.parentNode;
    parent.style.borderLeft="2px solid rgb(51,152,204";
    parent.style.background="rgb(240,240,240)";
    let numberPatient = parent.firstChild.textContent;// определяем номер пациента
    //фио
    document.getElementById("fio").textContent=x[numberPatient-1].firstName+" "+x[numberPatient-1].lastName+" "+x[numberPatient-1].patrName;
    //Определяем возраст
    let agePatient;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let day = now.getDate();
    let yearPatient = x[numberPatient-1].birthDate.slice(0,4);//определяем год рождения пациента
    let monthPatient = x[numberPatient-1].birthDate.slice(5,7);//определяем месяц рождения пациента
    let dayPatient = x[numberPatient-1].birthDate.slice(8);//определяем день рождения пациента
    if (Number(month)>Number(monthPatient)) {
        agePatient = Number(year) - Number(yearPatient);
    }else if (Number(month)<Number(monthPatient)){
        agePatient = (Number(year) - Number(yearPatient))-1;
    } else if (Number(day)>=Number(dayPatient)) {
        agePatient = Number(year) - Number(yearPatient);
    } else agePatient = (Number(year) - Number(yearPatient))-1;
    document.getElementById("age").textContent= agePatient;
    //диагноз
    document.getElementById("diagnosis").textContent= x[numberPatient-1].diagnosis;
}
async function getInfoQuitting(e){
    const url="https://api.myjson.com/bins/1g4glq";
    const x = await fetch(url).then(x=>x.json());

    let arr = document.getElementById("quitting").getElementsByTagName("tr");
    for (i = 0; i < arr.length; i++) {
        arr[i].style.background = "white";
        arr[i].style.border="1px solid grey";
    }
    
    let parent = e.target.parentNode;
    parent.style.borderLeft="2px solid rgb(51,152,204";
    parent.style.background="rgb(240,240,240)";
    let numberPatient = parent.firstChild.textContent;// определяем номер пациента
    //фио
    document.getElementById("fio").textContent=x[numberPatient-1].firstName+" "+x[numberPatient-1].lastName+" "+x[numberPatient-1].patrName;
    //Определяем возраст
    let agePatient;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let day = now.getDate();
    let yearPatient = x[numberPatient-1].birthDate.slice(0,4);//определяем год рождения пациента
    let monthPatient = x[numberPatient-1].birthDate.slice(5,7);//определяем месяц рождения пациента
    let dayPatient = x[numberPatient-1].birthDate.slice(8);//определяем день рождения пациента
    if (Number(month)>Number(monthPatient)) {
        agePatient = Number(year) - Number(yearPatient);
    }else if (Number(month)<Number(monthPatient)){
        agePatient = (Number(year) - Number(yearPatient))-1;
    } else if (Number(day)>=Number(dayPatient)) {
        agePatient = Number(year) - Number(yearPatient);
    } else agePatient = (Number(year) - Number(yearPatient))-1;
    document.getElementById("age").textContent= agePatient;
    //диагноз
    document.getElementById("diagnosis").textContent= x[numberPatient-1].diagnosis;
}