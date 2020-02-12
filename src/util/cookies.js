export function get(key){
    var cookie = document.cookie;
    var splitted = cookie.split(";");
    if(splitted != undefined && splitted.length > 0){
        for(var i = 0; i < splitted.length; i++){
            var pair = splitted[i].split("=");
            if(pair[0].trim() == key){
                return pair[1].trim();
            }
        }
    }
    return undefined;
}

export function save(key, value){
    document.cookie = key + "=" + value;
}