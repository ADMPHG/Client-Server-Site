// Event Listeners //

// ON LOAD: Load all members
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

// ON LOAD: Load rocket info
window.addEventListener('load', async e => {
    await fetch('http://127.0.0.1:8090/api/rockets/Falcon 9')
    .then(res => res.json())
    .then(body => renderRocketInfo(body));
});

// Load info of selected rocket
document.getElementById('selectFalcon9').addEventListener('click', async e => {
    e.preventDefault();
    await fetch('http://127.0.0.1:8090/api/rockets/Falcon 9')
    .then(res => res.json())
    .then(body => renderRocketInfo(body));
});
document.getElementById('selectFalconH').addEventListener('click', async e => {
    e.preventDefault();
    await fetch('http://127.0.0.1:8090/api/rockets/Falcon Heavy')
    .then(res => res.json())
    .then(body => renderRocketInfo(body));
});
document.getElementById('selectStarship').addEventListener('click', async e => {
    e.preventDefault();
    await fetch('http://127.0.0.1:8090/api/rockets/Starship')
    .then(res => res.json())
    .then(body => renderRocketInfo(body));
});

// ON LOAD: Load members who set rocket as favourite
window.addEventListener('load', async e => {
    await fetch('http://127.0.0.1:8090/api/members/fav/Falcon 9')
    .then(res => res.json())
    .then(body => renderFavourites(body));
});

// Load members who set selected rocket as favourite
document.getElementById('selectFalcon9').addEventListener('click', async e => {
    e.preventDefault();
     await fetch('http://127.0.0.1:8090/api/members/fav/Falcon 9')
    .then(res => res.json())
    .then(body => renderFavourites(body));
});
document.getElementById('selectFalconH').addEventListener('click', async e => {
    e.preventDefault();
    await fetch('http://127.0.0.1:8090/api/members/fav/Falcon Heavy')
    .then(res => res.json())
    .then(body => renderFavourites(body));
});
document.getElementById('selectStarship').addEventListener('click', async e => {
    e.preventDefault();
    await fetch('http://127.0.0.1:8090/api/members/fav/Starship')
    .then(res => res.json())
    .then(body => renderFavourites(body));
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

// Render rocket info
function renderRocketInfo (attributes) {
    // Select all elements
    const imageContainer = document.getElementById('rocketImage');
    const name = document.getElementById('rocketName');
    const payload = document.getElementById('payload');
    const cost = document.getElementById('cost');
    const mass = document.getElementById('mass');
    const height = document.getElementById('height');
    // Clear image container
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }
    // Create image, append all attributes
    const image = document.createElement('img');
    image.setAttribute('class', 'img-fluid');
    image.setAttribute('src', `images/${attributes[0].name}.jpg`);
    image.setAttribute('alt', 'Falcon 9 Launch');
    imageContainer.appendChild(image);
    // Insert data into elements
    name.innerHTML = attributes[0].name;
    payload.innerHTML = `Payload: ${attributes[0].payload}`;
    cost.innerHTML = `Cost: ${attributes[0].cost}`;
    mass.innerHTML = `Mass: ${attributes[0].mass}`;
    height.innerHTML = `Height: ${attributes[0].height}`;
    //
}

// Renders members passed to function onto the html page
function renderMembers (members) {
    const container = document.getElementById('memberSearchResults');
    // Clear container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Render column headings
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

// Renders fans of the selected rocket
function renderFavourites (members) {
    const container = document.getElementById('favouriteRocket');
    // Clear container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Render favourite members
    for (const member in members) {
        const favMember = document.createElement('li');
        favMember.innerHTML = members[member].name;
        container.appendChild(favMember);
    }
}
