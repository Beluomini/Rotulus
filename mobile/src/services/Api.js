const deployHost = 'https://rotulus-backend.onrender.com';

function signIn(user) {
    return fetch(`${deployHost}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function createUser(user) {
    console.log(user);
    return fetch(`${deployHost}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function getAllUsers() {
    return fetch(`${deployHost}/user`)
        .then(res => res.json())
}

function getUserById(id, token) {
    return fetch(`${deployHost}/user/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + token
        }
    }).then(res => res.json())
}

function getUserByEmail(email, token) {
    return fetch(`${deployHost}/user/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    }).then(res => res.json())
}

function editUserById(id, user, token) {
    return fetch(`${deployHost}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function editUserHistById(id, user, token) {
    return fetch(`${deployHost}/user/hist/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function editUserAlergById(id, user, token) {
    return fetch(`${deployHost}/user/alergies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

function getAllFoods() {
    return fetch(`${deployHost}/food`)
        .then(res => res.json())
}

function getFoodById(id) {
    return fetch(`${deployHost}/food/${id}`)
        .then(res => res.json())
}

function getFoodByName(name) {
    return fetch(`${deployHost}/food/name/${name}`)
        .then(res => res.json())
}

function getFoodByBarcode(barcode) {
    return fetch(`${deployHost}/food/barcode/${barcode}`)
        .then(res => res.json())
}

function getAllClassifications() {
    return fetch(`${deployHost}/classification`)
        .then(res => res.json())
}

function getClassificationById(id) {
    return fetch(`${deployHost}/classification/${id}`)
        .then(res => res.json())
}

function getAllIngredients() {
    return fetch(`${deployHost}/ingredient`)
        .then(res => res.json())
}

function getIngredientByName(name) {
    return fetch(`${deployHost}/ingredient/name/${name}`)
        .then(res => res.json())
}

function getIngredientById(id) {
    return fetch(`${deployHost}/ingredient/${id}`)
        .then(res => res.json())
}


export default { 
    getAllUsers, getUserById, getUserByEmail, 
    createUser, signIn, editUserById, getFoodById, 
    getAllFoods, getClassificationById, getFoodByName,
    getAllClassifications, getFoodByBarcode, 
    editUserHistById, getAllIngredients, editUserAlergById,
    getIngredientByName, getIngredientById };