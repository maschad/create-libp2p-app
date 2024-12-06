import { createLibp2p as create } from 'libp2p'

export async function createLibp2p(config: any) {
	const node = await create(config)
	return node
}
