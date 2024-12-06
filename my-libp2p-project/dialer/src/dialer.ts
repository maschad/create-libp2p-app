import { multiaddr } from "@multiformats/multiaddr"
import { createLibp2p } from "libp2p"
import libp2pConfig from "../../shared/libp2p"
import { createInterface } from "readline"
import { streamToConsole } from "../utils/stream";
import { stdinToStream } from "../utils/stream";

createLibp2p(libp2pConfig).then(async (dialer) => {
	// Create a new libp2p node on localhost with a randomly chosen port
	dialer.start()

	dialer.getMultiaddrs().forEach((ma) => {
		console.log(ma.toString())
	})

	// Log a message when a remote peer connects to us
	dialer.addEventListener('peer:connect', (evt) => {
		const remotePeer = evt.detail
		console.log('\nconnected to Peer: ', remotePeer.toString())
		console.log('\nExpecting messages from peer...you can type now.')
	})

	// Prompt for the multiaddr
	const readline = createInterface({
		input: process.stdin,
		output: process.stdout
	});

	let targetAddress = await new Promise<string>((resolve) => {
		readline.question('Please enter the multiaddr to dial: ', (addr) => {
			readline.close();
			resolve(addr);
		});
	});

	while (!targetAddress) {
		console.error('A multiaddr is required.\nExample: /ip4/127.0.0.1/tcp/8080/p2p/QmHash..');
		const rl = createInterface({
			input: process.stdin,
			output: process.stdout
		});
		targetAddress = await new Promise<string>((resolve) => {
			rl.question('Please enter the multiaddr to dial: ', (addr) => {
				rl.close();
				resolve(addr);
			});
		});
	}


	// get the address to be dialled via cli args
	const stream = await dialer.dialProtocol(multiaddr(targetAddress), '/chat/1.0.0')


	// Send stdin to the stream
	stdinToStream(stream)
	// Read the stream and output to console
	streamToConsole(stream)

}).catch((e) => {
	console.error(e);
});