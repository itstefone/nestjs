


export class CustomResponse {
    message: string;
    status: number;
    data: any;



    constructor(message: string, status: number, data:any = []) {

        this.message = message;
        this.status = status;
        this.data = data;
    }
}