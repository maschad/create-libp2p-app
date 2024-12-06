import { multiaddr } from "@multiformats/multiaddr"
import { createLibp2p } from "libp2p"
import libp2pConfig from "./libp2p"
import { createInterface } from "readline"

createLibp2p(libp2pConfig).then(async (dialer) => {
	// Create a new libp2p node on localhost with a randomly chosen port
	dialer.start()

	dialer.getMultiaddrs().forEach((ma) => {
		console.log(ma.toString())
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
		targetAddress = await new Promise<string>((resolve) => {
			readline.question('Please enter the multiaddr to dial: ', (addr) => {
				readline.close();
				resolve(addr);
			});
		});
	}


	// get the address to be dialled via cli args
	const connection = await dialer.dial(multiaddr(targetAddress))

	console.log('connected to Peer:', connection.remotePeer.toString())

}).catch((e) => {
	console.error(e);
});