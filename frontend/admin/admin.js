const API = "http://localhost:5000/api/admin"

const token = localStorage.getItem("adminToken")


async function loadContacts(){

const res = await fetch(`${API}/contacts`,{

headers:{
Authorization: token
}

})

const data = await res.json()

renderTable(data)

}


async function loadCounselling(){

const res = await fetch(`${API}/counselling`,{

headers:{
Authorization: token
}

})

const data = await res.json()

renderTable(data)

}


async function loadVolunteers(){

const res = await fetch(`${API}/volunteers`,{

headers:{
Authorization: token
}

})

const data = await res.json()

renderTable(data)

}


function renderTable(data){

const table = document.getElementById("tableBody")

table.innerHTML=""

data.forEach(item => {

table.innerHTML += `

<tr>

<td>${item.name}</td>
<td>${item.email}</td>
<td>${item.message || item.reason || ""}</td>

<td>

<button onclick="deleteItem('${item._id}')">
Delete
</button>

</td>

</tr>

`

})

}


async function deleteItem(id){

await fetch(`${API}/contact/${id}`,{

method:"DELETE",

headers:{
Authorization: token
}

})

alert("Deleted")

}