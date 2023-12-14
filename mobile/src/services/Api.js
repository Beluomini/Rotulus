const ip = '192.168.0.136';

function signIn(user) {
    return fetch(`http://${ip}:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function createUser(user) {
    console.log(user);
    return fetch(`http://${ip}:3000/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function getAllUsers() {
    return fetch(`http://${ip}:3000/user`)
        .then(res => res.json())
}

function getUserById(id) {
    return fetch(`http://${ip}:3000/user/${id}`)
        .then(res => res.json())
}

function getUserByEmail(email) {
    return fetch(`http://${ip}:3000/user/email/${email}`)
        .then(res => res.json())
}

function editUserById(id, user, token) {
    return fetch(`http://${ip}:3000/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function getAllFoods() {
    return fetch(`http://${ip}:3000/food`)
        .then(res => res.json())
}

function getFoodById(id) {
    return fetch(`http://${ip}:3000/food/${id}`)
        .then(res => res.json())
}

function getClassificationById(id) {
    return fetch(`http://${ip}:3000/classification/${id}`)
        .then(res => res.json())
}


export default { getAllUsers, getUserById, getUserByEmail, createUser, signIn, editUserById, getFoodById, getAllFoods, getClassificationById };