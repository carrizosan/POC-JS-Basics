import {array} from "/MOCK_DATA.js";

var data;
var filteredData;

function loadData () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(array);
            reject("Something was wrong");
        }, 1000);
    });
}

window.addEventListener('load', function() {

    loadData()
    .then(response => {
        console.log("Data loaded");
        data = response;
        sortData(data);
    })
    .catch(reason => {
        console.log("ERROR: " + reason);
    });

    document.getElementById("sort-key").addEventListener("change", function(){
        sortData(filteredData);
    });

    document.getElementById("filter").addEventListener("change", function() {
        filterData(data);
    });

    document.getElementById("filter-value").addEventListener("input", function() {
        filterData(data);
    })
});

function showData(json) {
    let table = document.getElementById("table-body");
    while (table.hasChildNodes()) {  
        table.removeChild(table.firstChild);
    }
    json.forEach(element => {
        let tr = document.createElement('tr');
        let id = document.createElement('td');
        let first = document.createElement('td');
        let last = document.createElement('td');
        let email = document.createElement('td');
        let dni = document.createElement('td');
        id.innerHTML = element.id;
        first.innerHTML = element.first_name; 
        last.innerHTML = element.last_name;
        email.innerHTML = element.email;
        dni.innerHTML = element.dni;
        tr.appendChild(id);
        tr.appendChild(first);
        tr.appendChild(last);
        tr.appendChild(email);
        tr.appendChild(dni);
        table.appendChild(tr);
    });
}


function sortData(json) {
    let sortSelect = document.getElementById("sort-key");
    let selected = sortSelect.options[sortSelect.selectedIndex].value;
    
    json.sort(function(a,b) {
        switch(selected) {
            case "id-asc":
                return (a.id > b.id) ? 1 : -1;
                break;
            case "id-desc":
                return (a.id < b.id) ? 1 : -1;
                break;
            case "f-asc":
                return (a.first_name > b.first_name) ? 1 : -1;
                break;
            case "f-desc":
                return (a.first_name < b.first_name) ? 1 : -1;
                break;
            case "l-asc":
                return (a.last_name > b.last_name) ? 1 : -1;
                break;
            case "l-desc":
                return (a.last_name < b.last_name) ? 1 : -1;
                break;
            case "dni-asc":
                return (a.dni > b.dni) ? 1 : -1;
                break;
            case "dni-desc":
                return (a.dni < b.dni) ? 1 : -1;
                break;
        }
    });
    showData(json);
}

function filterData(json) {
    let filterSelect = document.getElementById("filter");
    let selected = filterSelect.options[filterSelect.selectedIndex].value;
    let value = document.getElementById("filter-value").value;
    filteredData = json;
    if(value !== ""){
        switch(selected){
            case "id":
                filteredData = filteredData.filter(element => element.id == value);
                break;
            case "first":
                filteredData = filteredData.filter(element => element.first_name.toLowerCase().includes(value.toLowerCase()));
                break;
            case "last":
                filteredData = filteredData.filter(element => element.last_name.toLowerCase().includes(value.toLowerCase()));
                break;
            case "email":
                filteredData = filteredData.filter(element => element.email.toLowerCase().includes(value.toLowerCase()));
                break;
            case "dni":
                filteredData = filteredData.filter(element => element.dni.toString().includes(value));8
                break; 
        }
        sortData(filteredData);
    } else {
        filteredData = data;
        sortData(data);
    }
}

    