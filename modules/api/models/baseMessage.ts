export default class BaseMessage
{
    from:string;
    type:MessageType;
    constructor(data:{
        from:string;
        type:MessageType;
    })
    {
        Object.assign(this,data);
    }
}
export enum MessageType
{
    Login=1,
    Text=2,
    Logout=3,
    ConnectionCount=4
}