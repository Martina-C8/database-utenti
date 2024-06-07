// Funzione che viene eseguita quando il documento è completamente caricato
document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL dell'API
    let users = await fetchUsers(apiUrl); // Recupera gli utenti dall'API
    renderUsers(users); // Visualizza gli utenti nella tabella

    // Aggiunge un listener all'input di testo per filtrare gli utenti mentre si digita
    document.getElementById('filterInput').addEventListener('input', () => filterUsers(users));
    // Aggiunge un listener al dropdown per filtrare gli utenti quando cambia l'opzione selezionata
    document.getElementById('filterOption').addEventListener('change', () => filterUsers(users));
});

// Funzione per recuperare gli utenti dall'API
async function fetchUsers(apiUrl) {
    try {
        const response = await fetch(apiUrl); // Esegue la richiesta all'API
        const users = await response.json(); // Converte la risposta in formato JSON
        return users; // Ritorna l'elenco degli utenti
    } catch (error) {
        console.error('Errore nel recupero degli utenti:', error); // Mostra l'errore nella console
        return []; // Ritorna un array vuoto in caso di errore
    }
}

// Funzione per visualizzare gli utenti nella tabella
function renderUsers(users) {
    const userTableBody = document.getElementById('userTableBody'); // Seleziona il corpo della tabella
    userTableBody.innerHTML = ''; // Svuota il contenuto della tabella
    // Per ogni utente, crea una riga della tabella e aggiungi i dati
    users.forEach(user => {
        const row = document.createElement('tr'); // Crea una nuova riga
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
        `;
        userTableBody.appendChild(row); // Aggiunge la riga alla tabella
    });
}

// Funzione per filtrare gli utenti
function filterUsers(users) {
    const filterOption = document.getElementById('filterOption').value; // Ottiene il valore dell'opzione selezionata
    const filterInput = document.getElementById('filterInput').value.toLowerCase(); // Ottiene il testo inserito e lo converte in minuscolo
    // Filtra gli utenti confrontando il testo inserito con il valore dell'opzione selezionata
    const filteredUsers = users.filter(user => user[filterOption].toLowerCase().includes(filterInput));
    renderUsers(filteredUsers); // Visualizza gli utenti filtrati nella tabella
}