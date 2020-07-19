export default class Logger {
    static enabled = false
    static log = (message: string): void => {
        if (Logger.enabled) {
            console.log(message)
        }
    }
}