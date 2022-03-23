export function getErrors(e: any) {
    let message = '';
    for (var clave in e) {
        message += e[clave]
        message += "\n"
    }
    return message
}