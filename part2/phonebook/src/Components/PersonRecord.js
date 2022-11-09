const PersonRecord = ({ person, deletePerson }) => (<li>👱 {person.name} | ☎️ {person.number} <button onClick={deletePerson}>🗑</button></li>)

export default PersonRecord