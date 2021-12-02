class Detail extends React.Component {
    constructor() {
        logger.debug('Detail -> constructor')

        super()

        this.state = { vehicle: null }
    }

    componentDidMount() {
        logger.debug('Detail -> component did mount')

        try {
            retrieveVehicle(this.props.itemId, (error, vehicle) => {
                if (error) return alert(error.message)

                this.setState({ vehicle })
            })
        } catch (error) {
            return alert(error.message)
        }
    }

    render() {
        logger.debug('Detail -> render')

        if (this.state.vehicle) 
            return <di>
                <h2>{this.state.vehicle.name}</h2>
                <img src={this.state.vehicle.image} />
                <p>{this.state.vehicle.description}</p>
                <p>{this.state.vehicle.price}</p>
                <p>{this.state.vehicle.color}</p>
                <p>{this.state.vehicle.style}</p>
                <p>{this.state.vehicle.year}</p>
                <a href={this.state.vehicle.url}>original item</a>
            </di>
        else 
            return null
    }
}