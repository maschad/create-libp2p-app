import { promptPubSubType } from "../prompts"
import { promptTransportType } from "../prompts"
import { promptEnvironmentType } from "../prompts"
import { promptDiscoveryType } from "../prompts"

export async function extractOptions() {
	const options: any = {
		transports: [],
		peerDiscovery: [],
		pubsub: undefined
	}

	const transportType = await promptTransportType();
	const environmentType = await promptEnvironmentType();
	const discoveryType = await promptDiscoveryType();
	const pubsubType = await promptPubSubType();

	console.log('transportType', transportType);
	console.log('environmentType', environmentType);
	console.log('discoveryType', discoveryType);
	console.log('pubsubType', pubsubType);

	return options
}
