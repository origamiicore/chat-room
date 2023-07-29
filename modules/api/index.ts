import { DataInput, EventInput, ModuleConfig, OriInjectable, OriService, PackageIndex, RouteResponse, SessionInput } from "@origamicore/core";
import ApiConfig from "./models/apiConfig";
import UserModel from './models/userModel';
import SessionModel from "./models/sessionModel";
import MessageModel from "./models/messageModel";
import BaseMessage from "./models/baseMessage";
import LoginMessageModel from "./models/loginMessage";
import LogoutMessageModel from "./models/logoutMessage";
import ConnectionCountMessage from "./models/connectionCountMessage";

@OriInjectable({domain:'api'})
export default class ApiService implements PackageIndex
{
    name:string='api';
    config:ApiConfig;
    connectedUser:Map<string,(message:BaseMessage)=>void>=new Map<string,(message:BaseMessage)=>void>()
    onlineUsers:string[]=[]
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> { 
        this.config=moduleConfig as ApiConfig;
        return ;
    }
    start(): Promise<void> {
        return;
    }
    restart(): Promise<void> {
        return;
    }
    stop(): Promise<void> {
        return;
    }
    sendMessage(message:BaseMessage)
    {
        this.connectedUser.forEach((value: (message: any) => void)=>{
            value(message)
        })
    }
    @OriService({isPublic:true})
    login(name:string)
    {
        let message =new LoginMessageModel({from:name})
        this.sendMessage(message)
        this.onlineUsers.push(name)
        return new RouteResponse({
            session:{userid:name}
        })
    }
    
    @OriService({isEvent:true})
    listen(@EventInput event:(message:any)=>void,@SessionInput session:SessionModel)
    {
        this.connectedUser.set(session.userid,event);
    }
    
    @OriService({})
    send(text:string,@SessionInput session:SessionModel)
    {
        let message=new MessageModel({from:session.userid,text})
        this.sendMessage(message)
    }

    connectionCount:number=0;
    sendCountMessage(from?:string)
    {
        let message=new ConnectionCountMessage({from,count:this.connectionCount})
        this.sendMessage(message)
    }
    @OriService({isInternal:true})
    closeSession(@SessionInput session:SessionModel)
    {
        this.connectionCount--;
        this.sendCountMessage(session.userid)
        if(session)
        {
            let message =new LogoutMessageModel({from:session.userid})
            this.sendMessage(message)
            let index =this.onlineUsers.indexOf(session.userid)
            this.onlineUsers.splice(index,1)
        }
    }

    @OriService({isInternal:true})
    openSession()
    {
        this.connectionCount++;
        this.sendCountMessage()

    }
    @OriService({})
    getOnlineUser()
    {
        return this.onlineUsers;
    }
}