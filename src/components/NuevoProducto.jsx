import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
//Actions de redux
import {crearNuevoProducto} from "../actions/productoActions";
import {mostrarAlerta, ocultarAlertaAction} from "../actions/alertaActions";

function NuevoProducto({history}) {

    //State del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    //utilizar usedispatch
    const dispatch = useDispatch()

    //Acceder al state del store
    const cargando = useSelector((state) => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const productoAgregado = useSelector(state => state.productos.productoAgregado)
    const alerta = useSelector(state => state.alerta.alerta)

    //Mandar a llamar el action de producto action
    const agregarProducto = (producto) => dispatch( crearNuevoProducto(producto) )

    const submitNuevoProducto = (e) => {
        e.preventDefault()

        //Validar formulario
        if(nombre.trim === '' || precio <= 0){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta) )

            return
        }

        //Si no hay errores
        dispatch( ocultarAlertaAction())
        //crear nuevoo producto
        agregarProducto({
            nombre,
            precio
        })
    }
    //Redireccionar
    useEffect(() => {
        if(productoAgregado){
            history.push('/')
        }else{

        }
    }, [productoAgregado,history]);


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card p-5">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Agregar nuevo producto</h2>
                    </div>
                    {
                        alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null
                    }
                    <form
                        onSubmit={submitNuevoProducto}
                    >
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre producto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre producto"
                                name="nombre"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio">Precio</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Precio producto"
                                name="precio"
                                value={precio}
                                onChange={e => setPrecio(Number(e.target.value))}
                            />
                        </div>
                        <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        {
                            cargando ? <p className="alert alert-success">Cargando...</p> : null
                        }
                        {
                            error ? <p className="alert alert-danger p-2 my-5 mx-auto w-50 text-center">Hubo un error al subir producto</p>: null
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;