function loadCustomers() {
    fetch("http://localhost:8080/customer/getAll")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let tableRow = `<tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Salary</th>
                </tr>`;

            let tableCustomers = document.getElementById("tblCustomers");

            data.forEach(customer => {
                tableRow += `<tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>`

            });

            tableCustomers.innerHTML = tableRow;
        })

}

loadCustomers();

function clear() {
    let name = document.getElementById("name").value = "";
    let address = document.getElementById("address").value = "";
    let salary = document.getElementById("salary").value = "";

}

function addCustomer() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let salary = document.getElementById("salary").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/add", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            loadCustomers();
            console.log(result)
        })
        .catch((error) => console.error(error));

    clear();
}

function searchCustomerById() {
    let searchValue = document.getElementById("searchCustomer").value;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/search/" + searchValue, requestOptions)
        .then((response) => response.json())
        .then((result) => {

            if (result) {
                document.getElementById("name").value = result.name;
                document.getElementById("address").value = result.address;
                document.getElementById("salary").value = result.salary;
            } else {
                alert("Customer Not Found");
            }
        })
        .catch((error) => console.error(error));

}

// function searchCustomerByName() {
//     let searchValue = document.getElementById("searchCustomer").value;

//     const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//       };

//       fetch("http://localhost:8080/customer/searchByName/"+searchValue, requestOptions)
//         .then((response) => response.text())
//         .then((result) => {

//             if (result) {
//                 document.getElementById("name").value = result.name;
//                 document.getElementById("address").value = result.address;
//                 document.getElementById("salary").value = result.salary;
//             } else {
//                 alert("Customer")
//             }
//             console.log(result)})
//         .catch((error) => console.error(error));

// }

function updateCustomer() {
    let id = document.getElementById("updateId").value;
    let name = document.getElementById("updateName").value;
    let address = document.getElementById("updateAddress").value;
    let salary = document.getElementById("updateSalary").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id,
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/update", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            loadCustomers();
            console.log(result)})
        .catch((error) => console.error(error));

}


