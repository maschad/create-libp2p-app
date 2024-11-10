import { createLibp2p } from './createNode';
import libp2pConfig from './libp2p';

createLibp2p(libp2pConfig).then((node) => {
	console.log(`Node listening on:`);
	node.getMultiaddrs().forEach((ma) => console.log(ma.toString()));
}).catch((e) => {
	console.error(e);
});
