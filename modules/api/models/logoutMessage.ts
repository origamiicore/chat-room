import BaseMessage, { MessageType } from "./baseMessage";

export default class LogoutMessageModel extends BaseMessage
{
    constructor(data:{
        from:string;
    })
    {
        super({
            from:data.from,
            type:MessageType.Logout
        })
    }
}