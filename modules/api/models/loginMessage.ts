import BaseMessage, { MessageType } from "./baseMessage";

export default class LoginMessageModel extends BaseMessage
{
    constructor(data:{
        from:string;
    })
    {
        super({
            from:data.from,
            type:MessageType.Login
        })
    }
}