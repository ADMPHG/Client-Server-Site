// Event Listeners //

// Loads all members
window.addEventListener('load', e => {
    fetch('http://127.0.0.1:8090/api/members')
    .then(response => response.json())
    .then(body => renderMembers(body));
});

// Loads rocket info
window.addEventListener('load', e => {
    fetch('http://127.0.0.1:8090/api/rockets/Falcon 9')
    .then(response => response.json())
    .then(body => renderRocketInfo(body));
});

// Functions //

function renderRocketInfo (attributes) {
    // Select all elements
    const imageContainer = document.getElementById('rocketImage');
    const name = document.getElementById('rocketName');
    const payload = document.getElementById('payload');
    const cost = document.getElementById('cost');
    const mass = document.getElementById('mass');
    const height = document.getElementById('height');
    // Create image, append all attributes
    const image = document.createElement('img');
    image.setAttribute('class', 'img-fluid');
    image.setAttribute('src', 'images/falcon9.jpg');
    image.setAttribute('alt', 'Falcon 9 Launch');
    imageContainer.appendChild(image);
    // Insert data into elements
    name.innerHTML = attributes[0].name;
    payload.insertAdjacentHTML('beforeend', attributes[0].payload);
    cost.insertAdjacentHTML('beforeend', attributes[0].cost);
    mass.insertAdjacentHTML('beforeend', attributes[0].mass);
    height.insertAdjacentHTML('beforeend', attributes[0].height);
    //
}

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

// Retrieve id of member searched for
const submitSearch = document.forms.memberSearchSubmit;

submitSearch.addEventListener('submit', e => {
    e.preventDefault();
    const value = submitSearch.querySelector('input[type="text"]').value;
    console.log(value);
});
