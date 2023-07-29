
import {ConfigModel} from "@origamicore/core";  
import { ConnectionEvent, ConnectionEventType, ConnectionProtocol, EndpointConfig, EndpointConnection, EndpointConnectionType } from "@origamicore/endpoint";
import ApiConfig from "./modules/api/models/apiConfig";
export default new ConfigModel({
    packageConfig:[
         new EndpointConfig({
            connections:[
                new EndpointConnection({
                    type:EndpointConnectionType.Soucket,
                    protocol:new ConnectionProtocol({
                        port:4000,
                        type:'http'
                    }),
                    events:[
                        new ConnectionEvent({
                            domain:'api',
                            service:'closeSession',
                            type:ConnectionEventType.Close
                        }),
                        new ConnectionEvent({
                            domain:'api',
                            service:'openSession',
                            type:ConnectionEventType.Open
                        }),
                    ]
                }),
                new EndpointConnection({
                    type:EndpointConnectionType.Express,
                    protocol:new ConnectionProtocol({
                        port:4001,
                        type:'http'
                    }),
                    publicFolder:['public']
                })
            ]
         }),
         new ApiConfig()
    ]
});