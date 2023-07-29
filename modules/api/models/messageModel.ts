import BaseMessage, { MessageType } from "./baseMessage";

export default class MessageModel extends BaseMessage
{
    text:string;
    constructor(data:{
        from:string;
        text:string;
    })
    {
        super({
            from:data.from,
            type:MessageType.Text
        })
        this.text=data.text;
    }
}