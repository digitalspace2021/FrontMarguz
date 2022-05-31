export function getErrors(e: any, code = 422) {
    let message = '';

    console.log(typeof e);


    switch (typeof e) {
        case 'object':


            for (var clave in e) {
                message += e[clave]
                message += "\n"
            }


            return message
            break;
        case 'string':
            return e
            break;
        default:
            console.log('no se ha podido procesar error' + e);
            return ''
            break;
    }
}