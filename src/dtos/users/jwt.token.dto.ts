


export class JwtTokenDTO {

    username: string;
    userId: number;
    userAgent: string;
    expire_at: number;
    ip: string;



    toPlainObject() {
        return {
            username: this.username,
            userid: this.userId,
            userAgent:this.userAgent,
            expire_at: this.expire_at,
            ip: this.ip
        }
    }
}