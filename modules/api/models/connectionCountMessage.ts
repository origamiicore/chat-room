import BaseMessage, { MessageType } from "./baseMessage";

export default class ConnectionCountMessage extends BaseMessage
{
    count:number;
    constructor(data:{
        from?:string;
        count:number;
    })
    {
        super({
            from:data.from,
            type:MessageType.ConnectionCount
        })
        this.count=data.count;
    }
}