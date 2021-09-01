// Event Listeners //

// Loads all members
window.addEventListener('load', async e => {
    await fetch('http://127.0.0.1:8090/api/members')
    .then(res => res.json())
    .then(body => renderMembers(body));
});

// Load member(s) searched for
const submitSearch = document.forms.memberSearchSubmit;
let searchType = 'members/';

submitSearch.addEventListener('submit', async e => {
    e.preventDefault();
    const value = submitSearch.querySelector('input[type="text"]').value;
    await fetch(`http://127.0.0.1:8090/api/${searchType}${value}`)
    .then(res => res.json())
    .then(body => renderMembers(body));
});

// Reset search to reload all members
document.getElementById('resetSearch').addEventListener('click', async e => {
    await fetch('http://127.0.0.1:8090/api/members')
    .then(res => res.json())
    .then(body => renderMembers(body));
});

// Create Member
const newMember = document.forms.newMemberSubmit;

newMember.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const favRocket = document.getElementById('favRocket').value;
    await fetch('http://127.0.0.1:8090/api/members/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, name: name, email: email, favRocket: favRocket })
    })
    .then(res => res.json())
    .then(body => renderMembers(body.members));
});

// Delete Member
const deleteMember = document.forms.memberDelete;

deleteMember.addEventListener('submit', async e => {
    e.preventDefault();
    const value = deleteMember.querySelector('input[type="text"]').value;
    await fetch(`http://127.0.0.1:8090/api/members/${value}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: value })
    })
    .then(res => res.json())
    .then(body => renderMembers(body.members));
});

// Functions //

// Change 'search by' field
function searchByID () {
    searchType = 'members/';
    const searchBar = document.getElementById('searchBar');
    searchBar.setAttribute('placeholder', 'Search members by ID');
    searchBar.innerHTML = '';
}
function searchByName () {
    searchType = 'members/name/';
    const searchBar = document.getElementById('searchBar');
    searchBar.setAttribute('placeholder', 'Search members by name');
    searchBar.innerHTML = '';
}
function searchByEmail () {
    searchType = 'members/email/';
    const searchBar = document.getElementById('searchBar');
    searchBar.setAttribute('placeholder', 'Search members by email address');
    searchBar.innerHTML = '';
}
function searchByFavRocket () {
    searchType = 'members/fav/';
    const searchBar = document.getElementById('searchBar');
    searchBar.setAttribute('placeholder', 'Search members by favourite rocket');
    searchBar.innerHTML = '';
}

// Function to handle errors
function handleErrors (res) {
    if (!res.ok) {
        const errorBox = document.getElementById('form-error-create');
        // Clear container
        while (errorBox.firstChild) {
            errorBox.removeChild(errorBox.firstChild);
        // Make error visible
        errorBox.style.display = 'block';
        // Write error message
        const errorMessage = document.createElement('li');
        errorMessage.setAttribute('class', 'list-group-item list-group-item-danger');
        errorMessage.innerHTML = res.body.message;
        }
    }
    return res;
}

// Render members passed to function onto the html page
function renderMembers (members) {
    const container = document.getElementById('memberSearchResults');
    // Clear container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Draw column headings
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    container.appendChild(row);
    const headings = ['ID', 'Name', 'Email', 'Favourite Rocket'];
    for (const item in headings) {
        const column = document.createElement('div');
        column.setAttribute('class', 'col-sm');
        const heading = document.createElement('h2');
        heading.innerHTML = headings[item];
        column.appendChild(heading);
        row.appendChild(column);
    }
    // Append a row for each member
    for (const member in members) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);
        // Append a column for each property
        for (const property in members[member]) {
            const column = document.createElement('div');
            column.setAttribute('class', 'col-sm');
            column.innerHTML = members[member][property];
            row.appendChild(column);
        }
    }
}
