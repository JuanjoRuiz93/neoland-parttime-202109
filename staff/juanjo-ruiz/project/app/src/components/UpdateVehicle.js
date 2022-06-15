import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { retrieveVehicle, updateVehicle } from "../logic"

export default function () {
    const navigate = useNavigate()
    const [data, setData] = useState()
    const { vehicleId } = useParams()

    useEffect(() => {
        try {
            retrieveVehicle(sessionStorage.token, vehicleId)
                .then(vehicle => {
                    setData(vehicle)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const update = event => {
        event.preventDefault()

        const { target: { lisense: { value: lisense }, brand: { value: brand }, model: { value: model }, frame: { value: frame }, active: { value: active } } } = event

        try {
            updateVehicle(sessionStorage.token, vehicleId, lisense, brand, model, frame, active)
                .then(() => {
                    alert('vehículo actualizado')

                    navigate('/vehicle')
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <div>
        <a onClick={() => navigate(`/vehicle/${vehicleId}`)}>Volver</a>
        {data ?
            <form onSubmit={update}>
                <input type="name" name="lisense" defaultValue={data.lisense} />
                <input type="name" name="brand" defaultValue={data.brand} />
                <input type="name" name="model" defaultValue={data.model} />
                <input type="name" name="frame" defaultValue={data.frame} />
                <select name="active" defaultValue={data.active}>
                    <option value="true">Activo</option>
                    <option value="false">Desactivado</option>
                </select>
                <button>Actualizar</button>
            </form>
            : <p>No hay dato</p>
        }
    </div>
}