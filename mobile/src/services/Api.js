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

function getUserById(id, token) {
    return fetch(`http://${ip}:3000/user/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + token
        }
    }).then(res => res.json())
}

function getUserByEmail(email, token) {
    return fetch(`http://${ip}:3000/user/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    }).then(res => res.json())
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

function editUserHistById(id, user, token) {
    return fetch(`http://${ip}:3000/user/hist/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function editUserAlergById(id, user, token) {
    return fetch(`http://${ip}:3000/user/alergies/${id}`, {
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

function getFoodByName(name) {
    return fetch(`http://${ip}:3000/food/name/${name}`)
        .then(res => res.json())
}

function getFoodByBarcode(barcode) {
    return fetch(`http://${ip}:3000/food/barcode/${barcode}`)
        .then(res => res.json())
}

function getAllClassifications() {
    return fetch(`http://${ip}:3000/classification`)
        .then(res => res.json())
}

function getClassificationById(id) {
    return fetch(`http://${ip}:3000/classification/${id}`)
        .then(res => res.json())
}

function getAllIngredients() {
    return fetch(`http://${ip}:3000/ingredient`)
        .then(res => res.json())
}

function getIngredientByName(name) {
    return fetch(`http://${ip}:3000/ingredient/name/${name}`)
        .then(res => res.json())
}

function getIngredientById(id) {
    return fetch(`http://${ip}:3000/ingredient/${id}`)
        .then(res => res.json())
}


export default { 
    getAllUsers, getUserById, getUserByEmail, 
    createUser, signIn, editUserById, getFoodById, 
    getAllFoods, getClassificationById, getFoodByName,
    getAllClassifications, getFoodByBarcode, 
    editUserHistById, getAllIngredients, editUserAlergById,
    getIngredientByName, getIngredientById };