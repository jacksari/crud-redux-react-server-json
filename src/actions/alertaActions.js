import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types'

//Muestra una alerta
export function mostrarAlerta(alerta){
    return (dispatch) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: alerta
        })
    }
}

//Ocultar alerta
export function ocultarAlertaAction(){
    return (dispatch) => {
        dispatch({
            type: OCULTAR_ALERTA
        })
    }
}