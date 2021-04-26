// Event Listeners //

// Loads all members
window.addEventListener('load', e => {
    fetch('http://127.0.0.1:8090/api/members')
    .then(response => response.json())
    .then(body => renderMembers(body));
});

// Functions //

function renderMembers (members) {
    const container = document.getElementById('memberSearchResults');
    // Append a row for each member
    for (const member in members) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);
        // Append a column for each property
        for (const property in members[member]) {
            const column = document.createElement('div');
            column.setAttribute('class', 'col');
            column.innerHTML = members[member][property];
            row.appendChild(column);
        }
    }
}