



let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let expenses = document.getElementById('expenses');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create'; 
let tmp;



function getTotal() {
    if (price.value !== '' && taxes.value !== '' && expenses.value !== '' 
            && discount.value !== '') {
        let result = (+price.value + +taxes.value + +expenses.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(141, 11, 2)';
    }
}// let title = document.getElementById('title');
// let price = document.getElementById('price');
// let taxes = document.getElementById('taxes');
// let expenses = document.getElementById('expenses');
// let discount = document.getElementById('discount');
// let total = document.getElementById('total');
// let count = document.getElementById('count');
// let category = document.getElementById('category');
// let submit = document.getElementById('submit');


// function getTotal(){
//     if(price.value != '' && taxes.value !='' && expenses.value != ''){
//         let result = (+price.value + +taxes.value + +expenses.value) 
//     - +discount.value;
//     total.innerHTML = result;
//     total.style.background = '#040';
//     }else{
//         total.innerHTML ='';
//         total.style.background = 'rgb(141, 11, 2)';

//     }
// };






let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}



submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        expenses:expenses.value,
        discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),
    }
    if(title.value != ''
        &&price.value !=''
        &&category.value !=''
        &&newpro.count < 101 ){
if(mood === 'create'){
if(newpro.count > 1){
    for(let i = 0;i < newpro.count  ;i++){
    datapro.push(newpro);
    }
}else{
    datapro.push(newpro);
}
}else{
    datapro[ tmp   ] = newpro;
    mood ='create';
    submit.innerHTML = 'create'
    count.style.display = 'block';
}
cleardata()
    }




    localStorage.setItem('product',  JSON.stringify(datapro))

    
    showdata()
}

function cleardata(){
title.value = '';
price.value = '';
taxes.value = '';
expenses.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
category.value = '';

}


function showdata(){
    getTotal()
let table = '';
for(let i = 0; i < datapro.length  ; i++){
    table += `
            <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].expenses}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick= "deletedata(   ${i})" id="delete">delete</button></td>
        </tr>`;

}

document.getElementById('tbody').innerHTML = table;
let btndelete = document.getElementById('deleteall')
if(datapro.length > 0){
btndelete.innerHTML = `
            <button onclick="deleteall()">Delete All (${datapro.length})</button>
`
}else{
    btndelete.innerHTML = '';
}
}

showdata()


function deletedata(i){
datapro.splice(i,1)
localStorage.product = JSON.stringify(datapro);
showdata()
}

// function deleteall(){
//     localStorage.clear()
//     datapro.splice(0)
//     showdata()
// }
function deleteall() {
    if (datapro.length === 0) {
        alert('No products to delete!');
        return;
    }
    if (confirm(`Are you sure you want to delete all ${datapro.length} products?`)) {
        localStorage.clear();
        datapro.splice(0);
        showdata();
    }
}

function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    expenses.value = datapro[i].expenses;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp =i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

let searchmood = 'title';
function getsearchmood(id){
    let search = document.getElementById('search');
if(id == 'searchtitle'){
    searchmood = 'title';
    
}else{
    searchmood = 'category';
    
}
search.placeholder = 'search by ' +searchmood;
search.focus()
search.value = '';
showdata()
}


function searchdata(value){
    let table = '';
    for(let i = 0;i <datapro.length   ;i++){
if(searchmood == 'title'){

    if(datapro[i].title.includes(value.toLowerCase())){
            table += `
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].expenses}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick= "deletedata(   ${i})" id="delete">delete</button></td>
        </tr>`;

    }
}

else{

    if(datapro[i].category.includes(value.toLowerCase())){
            table += `
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].expenses}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick= "deletedata(   ${i})" id="delete">delete</button></td>
        </tr>`;

    }
}
}
document.getElementById('tbody').innerHTML = table;
}



