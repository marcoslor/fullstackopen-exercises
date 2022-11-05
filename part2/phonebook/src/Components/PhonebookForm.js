const PhonebookForm = ({handleOnSubmit}) => (
    <form onSubmit={handleOnSubmit} id='phonebook-form'>
        <div>
            <label htmlFor="name">name:</label>
            <input name='name' />
        </div>
        <div>
            <label htmlFor="name">phone:</label>
            <input name='number' />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PhonebookForm