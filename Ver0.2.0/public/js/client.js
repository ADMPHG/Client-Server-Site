window.addEventListener('click', function (event) {
    fetch('http://127.0.0.1:8090/api/rockets')
    .then(response => response.json())
    .then(body => renderList(body));
});

function renderList (attributes) {
    const container = document.getElementById('falcon9');
    for (const attribute in attributes[0]) {
        const item = document.createElement('li');
        item.innerHTML = attributes[0][attribute];
        container.appendChild(item);
    }
}

// function renderList (attributes) {
//     console.log(attributes[0]);
//     }
