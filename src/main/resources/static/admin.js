$(document).ready(function () {
    createTable();
    createRoles();
});

function createTable() {
    $.ajax("/rest/users", {
        dataType: "json",
        success: function (data) {
            const users = JSON.parse(JSON.stringify(data));
            for (let i = 0; i < users.length; i++) {

                let tr = $("<tr>")
                    .attr("id", users[i].id);
                tr.append("" +
                    "<td>" + users[i].id + "</td>" +
                    "<td>" + users[i].name + "</td>" +
                    "<td>" + users[i].lastName + "</td>" +
                    "<td>" + users[i].age + "</td>" +
                    "<td>" + users[i].login + "</td>" +
                    "<td>" + getUserRoles(users[i].roles) + "</td>" +
                    "<td><button onclick='editUser(" + users[i].id + ")' type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#editModal\">Edit</button></td>" +
                    "<td><button onclick='deleteUser(" + users[i].id + ")' class=\"btn btn-danger\">Delete</button></td>"
                );
                $("#tableBody").append(tr)
            }

        },

    });
}

// function printCountUsers(funcName) {
//     var tableBodyElem = document.getElementById("tableBody")
//     var trElements = tableBodyElem.getElementsByTagName("tr")
//
//
//     console.log('Привет от JavaScript!' + funcName + " " + trElements.length);
//     //deleteTable()
//
// }

function deleteTable() {
    var tableBodyElem = document.getElementById("tableBody")
    if (tableBodyElem != null) {
        var trElements = tableBodyElem.getElementsByTagName("tr")
        for (let i = trElements.length - 1; i >= 0; i--) {
            trElements[i].remove()
        }
    }
}


function refreshTable() {
    deleteTable()
    createTable()
    //location.reload();

}


function getUserRoles(roles) {
    const userRoles = [];
    for (const i in roles) {
        userRoles[i] = roles[i].role;
    }
    return userRoles;
}

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: "/rest/user/" + id,
        contentType: "application/json",
        success: function (data) {
            $("#tableBody #" + id).remove();

            console.log(data)

        },
    });
}

function createRoles() {
    $.ajax({
        type: "GET",
        url: "/rest/roles",
        contentType: "application/json",
        success: function (data) {
            data.forEach(function (role) {
                $("#newUserRole, #userRole").append(
                    "<option role-id=" + role.id + " value=" + role.role + ">" + role.role + "</option>"
                );
            })
        },

    });
}

function cleanUserForm() {
    $("#newUserName").val("")
    $("#newUserLastName").val("")
    $("#newUserAge").val("")
    $("#newUserLogin").val("")
    $("#newUserPassword").val("")
    $("#newUserRole").val("")
}

function newUser() {

    let roles = [];
    $("#newUserRole option:selected").each(function () {
        roles.push({id: $(this).attr("role-id"), role: $(this).attr("value")})
    });

    let json = {
        name: $("#newUserName").val(),
        lastName: $("#newUserLastName").val(),
        age: $("#newUserAge").val(),
        login: $("#newUserLogin").val(),
        password: $("#newUserPassword").val(),
        roles: JSON.parse(JSON.stringify(roles))
    };
    cleanUserForm()

    $.ajax({
        url: '/rest/user',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(json),
        success: function (data) {
            $('#usersTab').addClass("show active")
            $('#navTable').addClass('active')
            $('#newUser').removeClass("show active")
            $('#navNewUser').removeClass("active")
            refreshTable()

        },

    });
}


function editUser(id) {
    $.ajax({
        type: "GET",
        url: "/rest/user/" + id,
        contentType: "application/json",
        success: function (data) {
            let user = JSON.parse(JSON.stringify(data));
            let rolesArr = getUserRoles(user.roles);
            $("#userId").val(user.id);
            $("#userName").val(user.name);
            $("#userLastName").val(user.lastName);
            $("#userAge").val(user.age);
            $("#userLogin").val(user.login);
            $("#userRole option").each(function () {
                for (const i in rolesArr) {
                    if ($(this).text() === rolesArr[i]) {
                        $(this).prop('selected', true);
                    } else {
                        $(this).prop('selected', false);
                    }
                }
            })
        },
    })
}

function updateUser() {
    let roles = [];
    let userId = $("#userId").val();

    $("#userRole option:selected").each(function () {
        roles.push({id: $(this).attr("role-id"), role: $(this).attr("value")})
    });

    let json = {
        name: $("#userName").val(),
        lastName: $("#userLastName").val(),
        age: $("#userAge").val(),
        login: $("#userLogin").val(),
        password: $("#userPassword").val(),
        roles: JSON.parse(JSON.stringify(roles))
    };

    $.ajax({
        type: "PUT",
        url: "/rest/edit_user/" + userId,
        data: JSON.stringify(json),
        contentType: "application/json",
        success: function () {
            refreshTable()
            $("#tableBody #" + id).update();
        },

    });
}