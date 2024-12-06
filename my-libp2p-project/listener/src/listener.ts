import { streamToConsole } from '../utils/stream';
import { stdinToStream } from '../utils/stream';
import { createLibp2p } from './createNode';
import libp2pConfig from '../../shared/libp2p';

createLibp2p(libp2pConfig).then(async (node) => {
	console.log(`Node listening on:`);
	node.getMultiaddrs().forEach((ma) => console.log(ma.toString()));

	// Log a message when a remote peer connects to us
	node.addEventListener('peer:connect', (evt) => {
		const remotePeer = evt.detail
		console.log('\nconnected to Peer: ', remotePeer.toString())
	})
	// Handle messages for the protocol
	await node.handle('/chat/1.0.0', async ({ stream }) => {
		console.log('\nType something to send a message.')
		// Send stdin to the stream
		stdinToStream(stream)
		// Read the stream and output to console
		streamToConsole(stream)
	})
}).catch((e) => {
	console.error(e);
});
