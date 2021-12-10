class Login extends React.Component {
    constructor() {
        super()

        this.state = { feedback: null }
    }

    render() {
        return <div className="container">
            <form className="form form-container" onSubmit={event => {
                event.preventDefault()

                const username = event.target.username.value
                const password = event.target.password.value

                try {
                    authenticateUser(username, password, (error, token) => {
                        if (error) {
                            this.setState({ feedback: error.message })

                            return
                        }

                        sessionStorage.token = token
                        
                        this.props.onLoggedIn(token)
                    })
                } catch (error) {
                    this.setState({ feedback: error.message })
                }
            }}>
                <h2 className="title title-form">Inicia Sesión</h2>

                <input className="input input-form" type="text" name="username" placeholder="usuario" />
                <input className="input input-form" type="password" name="password" placeholder="contraseña" />

                <button className="button button-form">Inicia Sesión</button>

                {this.state.feedback ? <p className="feedback-error">{this.state.feedback}</p> : null }
            </form>

            <p><a href="" onClick={event => {
                event.preventDefault()

                this.props.onRegisterClick()
            }}>Registrate</a> si aún no tienes cuenta </p>
        </div>
    }
}