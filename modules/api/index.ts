import { DataInput, EventInput, ModuleConfig, OriInjectable, OriService, PackageIndex, RouteResponse, SessionInput } from "@origamicore/core";
import ApiConfig from "./models/apiConfig";
import UserModel from './models/userModel';
import SessionModel from "./models/sessionModel";
import MessageModel from "./models/messageModel";

@OriInjectable({domain:'api'})
export default class ApiService implements PackageIndex
{
    name:string='api';
    config:ApiConfig;
    connectedUser:Map<string,(message:any)=>void>=new Map<string,(message:any)=>void>()
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
    
    @OriService({isPublic:true})
    login(name:string)
    {
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
        this.connectedUser.forEach((value: (message: any) => void, key: string)=>{
            value(message)
        })
    }

}