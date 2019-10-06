/**
 * Retorna el path del back-end
 * @param {*} path : recurso del path del back-end
 */
export function getBackEndContext(resource){
    const backEndPath = "http://localhost:8080/scc/";
    return resource === undefined || resource === "" ? backEndPath : backEndPath.concat(resource);
}

/**
 * Construye los query params para la consultas
 * @param {*} params : de tipo Objeto var = {a:1}
 * @param {*} context : de tipo String http://localhost:8080/scc/any
 */
export function buildQueryParams(params, context) {
    let queryArray = Object.keys(params).map(key => params[key] !== "" && params[key] !== undefined ? key.concat("=").concat(params[key]) : "");
    let newQueryParam = [];
    for(let i = 0 ; i<queryArray.length;i++){
        if(queryArray[i]!==""){
            newQueryParam.push(queryArray[i]);
        }
    }
    let queryStr = newQueryParam.join(newQueryParam.length > 1 ? "&" : "");
    return context.concat("?").concat(queryStr);
}

/**
 * Construye la fecha YYYY-MM-ddThh:mm:ss
 * @param {*} dateOld 
 */
export function buildDate(dateOld){
    let time = new Date().toLocaleTimeString();
    let newDate = dateOld+'T'+time;
    return newDate;
}