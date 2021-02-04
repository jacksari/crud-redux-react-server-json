import React, {Fragment, useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
//Actions de redux
import {obtenerProductosAction} from "../actions/productoActions";
import Producto from "./Producto";

function Productos(){

    const dispatch = useDispatch()
    //Acceder al state del store
    const productos = useSelector((state) => state.productos.productos)
    //console.log(productos)
    const error = useSelector(state => state.productos.error)
    const cargando = useSelector(state => state.productos.loading)


    useEffect(() => {
        //Consultar la API
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
    }, [dispatch]);
    
    const listadoProductos = (productos) => productos.map((producto,index) => {
        return (
            <Producto key={index} index={index} producto={producto}/>
        )
    })

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de productos</h2>
            {
                error ? <span className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error al cargar los datos</span> : null
            }
            {
                cargando ? <span className="font-weight-bold alert alert-primary text-center mt-4">Cargando...</span> : null
            }
            <table className="table table-striped my-5">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    listadoProductos(productos)
                }
                </tbody>
            </table>
        </Fragment>
    );
}

export default Productos;