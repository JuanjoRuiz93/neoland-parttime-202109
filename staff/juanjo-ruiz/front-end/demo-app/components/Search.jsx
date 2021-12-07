function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        var query = event.target.query.value

        props.onQuery(query)
    }} >
        <h4>Busca tu coche</h4>
        <input className="input" type="text" name="query" placeholder="criterio" />
        <button className="button">Buscar</button>
    </form>
}