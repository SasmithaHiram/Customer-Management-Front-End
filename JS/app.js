function loadCustomers() {
    fetch("http://localhost:8080/customer/getAll")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let tableRow = `<tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>`;

            let tableCustomers = document.getElementById("tblCustomers");

            data.forEach(customer => {
                tableRow += `<tr>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                    <td>
                        <button class="btn btn-edit btn-sm"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-delete btn-sm"><i class="fas fa-trash"></i> Delete</button>
                    </td>
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
    loadCustomers();
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
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}

function searchCustomerById() {
    let searchValue = document.getElementById("searchCustomer").value;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://localhost:8080/customer/search/"+searchValue, requestOptions)
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


