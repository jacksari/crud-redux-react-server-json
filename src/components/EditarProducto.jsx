import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editarProductoAction} from "../actions/productoActions";
import { useHistory } from 'react-router-dom'

function EditarProducto() {

    const history = useHistory()

    const dispatch = useDispatch()

    //State de producto
    const [productoEditar, setProductoEditar] = useState({
        nombre: '',
        precio: ''
    });

    const producto = useSelector(state => state.productos.productoEditar)
    //Llenar state
    useEffect(() => {
        setProductoEditar(producto)
    }, [producto]);

    //Leer datos del formulario
    const onChangeFormulario = e => {
        setProductoEditar({
            ...productoEditar,
            [e.target.name]: e.target.value
        })
    }
    const { nombre, precio } = productoEditar

    const submitEditarProducto = e => {
        console.log('prod', productoEditar)
        e.preventDefault()
        dispatch( editarProductoAction(productoEditar) )
        history.push('/')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card p-5">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Editar producto</h2>
                    </div>
                    <form
                        onSubmit={submitEditarProducto}
                    >
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre producto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre producto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeFormulario}
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
                                onChange={onChangeFormulario}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarProducto;