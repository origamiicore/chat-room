export default class MessageModel
{
    from:string;
    text:string;
    constructor(data:{
        from:string;
        text:string;
    })
    {
        Object.assign(this,data);
    }
}