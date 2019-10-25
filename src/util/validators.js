export function validateField(value, max, min){       
    if(value === undefined){  return false; } // undefined
    if (value && value.trim().length === 0) { return false; } // vacio        
    if(value.length >= min && value.length <= max) { return true; } // min y max
    return false;
}

export function validateDate(date){
    if(date === undefined){  return false; } // undefined
    return true;
}

export function validateNumber(value, max, min){       
    if(value === undefined){  return false; } // undefined
    if(value >= min && value <= max) { return true; } // min y max
    return false;
}    

export function validateEmail(value){
    if(value === undefined){  return false; } // undefined
    if (value && value.trim().length === 0) { return false; } // vacio
    var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) { return true; }
    return false;
}

export function validateSelect(value){
    if(value === 0){ return false; }
    return true;
}

export function validateList(array){
    if(array === undefined || array.length <= 0){ return false; }
    return true;
}