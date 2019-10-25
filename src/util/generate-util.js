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
 * Construye la fecha YYYY-MM-ddThh:mm:ssZ
 * @param {*} dateOld 
 */
export function buildDate(dateOld) {
    const separate  = "-";
    const formatT   = "T";
    const formatZ   = "Z";
    let day;
    let month;
    let year;
    let time = new Date().toLocaleTimeString();;
    let newDate;
    if (dateOld instanceof Date){
        day     = dateOld.getDate().toString();
        month   = (dateOld.getMonth()+1).toString();
        year    = dateOld.getFullYear().toString();
    } else {
        let date = dateOld.split("-");
        day   = date[2];
        month = date[1];
        year  = date[0];
    }
    newDate = year.concat(separate).concat(month).concat(separate).concat(day).concat(formatT).concat(time).concat(formatZ);
    return newDate;    
}

/**
 * Da formato a numeros {nro} Gs.
 * @param {*} number 
 */
export function formatoMoneda(number){
    return new Intl.NumberFormat('de-DE').format(number).concat(" Gs.");
}

/**
 * retorna el mes y el año
 * @param {*} pos 
 */
export function getMonthYear(pos) {
    let annum = new Date().getFullYear().toString();
    let monts = [{month: "ENERO",year: annum}, {month: "FEBRERO",year: annum}, {month:"MARZO", year: annum}, {month:"ABRIL", year:annum}, {month:"MAYO", year:annum}, {month:"JUNIO", year:annum}, {month:"JULIO", year:annum}, {month:"AGOSTO", year:annum}, {month:"SEPTIEMBRE", year:annum}, {month:"OCTUBRE", year:annum}, {month:"NOVIEMBRE", year:annum}, {month:"DICIEMBRE", year:annum}];
    return monts[pos];
}