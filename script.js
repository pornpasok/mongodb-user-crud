function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/users");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = ''; 
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += '<tr>'; 
        trHTML += '<td>'+object['id']+'</td>';
        trHTML += '<td>'+object['expiredate']+'</td>';
        trHTML += '<td>'+object['status']+'</td>';
        trHTML += '<td>'+object['fname']+'</td>';
        trHTML += '<td>'+object['lname']+'</td>';
        trHTML += '<td>'+object['username']+'</td>';
        trHTML += '<td>'+object['dbname']+'</td>';
        trHTML += '<td>'+object['role']+'</td>';
        trHTML += '<td>'+object['dateadd']+'</td>';
        // Check delete status
        if (object['status'] == 'delete') {
          trHTML += '<td>'+object['status']+'</td>';
        } else {
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="showUserDeleteBox('+object['id']+')">Del</button></td>';
        }
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showUserCreateBox() {
  Swal.fire({
    title: 'Create user',
    html:
      '<input id="id" class="swal2-input" placeholder="ID">' +
      '<input id="fname" class="swal2-input" placeholder="First">' +
      '<input id="lname" class="swal2-input" placeholder="Last">' +
      '<input id="username" class="swal2-input" placeholder="Username">' +
      '<input id="dbname" class="swal2-input" placeholder="DB">' +
      '<input id="role" class="swal2-input" placeholder="Role">' +
      '<input id="email" class="swal2-input" placeholder="Email">' +
      '<input id="expiredate" class="swal2-input" placeholder="Expire Date">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}

function userCreate() {
  const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const dbname = document.getElementById("dbname").value;
  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;
  const expiredate = document.getElementById("expiredate").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/users/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "fname": fname, "lname": lname, "username": username, "dbname": dbname, "role": role, "email": email, 
    "expiredate": expiredate
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

// function userDelete(id) {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("DELETE", "http://localhost:3000/users/delete");
//   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhttp.send(JSON.stringify({ 
//     "id": id
//   }));
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4) {
//       const objects = JSON.parse(this.responseText);
//       Swal.fire(objects['message']);
//       loadTable();
//     } 
//   };
// }

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/users/"+id);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['user'];
      console.log(user);
      Swal.fire({
        title: 'Edit User',
        html:
          '<input id="id" class="swal2-input" placeholder="First" value="'+user['id']+'" disabled>' +
          '<input id="fname" class="swal2-input" placeholder="First" value="'+user['fname']+'">' +
          '<input id="lname" class="swal2-input" placeholder="Last" value="'+user['lname']+'">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="'+user['username']+'">' +
          '<input id="dbname" class="swal2-input" placeholder="DB" value="'+user['dbname']+'">' +
          '<input id="role" class="swal2-input" placeholder="Role" value="'+user['role']+'">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">' +
          '<input id="expiredate" class="swal2-input" placeholder="Expire Date" value="'+user['expiredate']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
}

// Delete Box
function showUserDeleteBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/users/"+id);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['user'];
      console.log(user);
      Swal.fire({
        title: 'Delete User',
        html:
          '<input id="id" class="swal2-input" placeholder="First" value="'+user['id']+'" disabled>' +
          '<input id="fname" class="swal2-input" placeholder="First" value="'+user['fname']+'">' +
          '<input id="lname" class="swal2-input" placeholder="Last" value="'+user['lname']+'">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="'+user['username']+'">' +
          '<input id="dbname" class="swal2-input" placeholder="DB" value="'+user['dbname']+'">' +
          '<input id="role" class="swal2-input" placeholder="Role" value="'+user['role']+'">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">' +
          '<input id="expiredate" class="swal2-input" placeholder="Expire Date" value="'+user['expiredate']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userDelete();
        }
      })
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const dbname = document.getElementById("dbname").value;
  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;
  const expiredate = document.getElementById("expiredate").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/users/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "fname": fname, "lname": lname, "username": username, "dbname": dbname, "role": role, "email": email, 
    "expiredate": expiredate
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

// Delete User
function userDelete() {
  const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const dbname = document.getElementById("dbname").value;
  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;
  const expiredate = document.getElementById("expiredate").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/users/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "fname": fname, "lname": lname, "username": username, "dbname": dbname, "role": role, "email": email, 
    "expiredate": expiredate, "status": 'delete'
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}
