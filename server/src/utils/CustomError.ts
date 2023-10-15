class CustomError extends Error{
    static statusText: string = "Failure";
    constructor(
        private _statusCode: number,
        private _message: string
    ){
        super(_message);
    }

    get statusCode (): number{
        return this._statusCode
    }

    set stausCode(code: number){
        if (code < 100 || code > 600) {
            console.log(`invalid status code.`)
            return;
        }
        this._statusCode = code;
    }
}

export default CustomError;