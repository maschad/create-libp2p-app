import { tcp } from '@libp2p/tcp'
import { mdns } from '@libp2p/mdns'
import { identify } from '@libp2p/identify'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'

export const libp2pConfig = {
  addresses: {
    listen: [
    "/ip4/0.0.0.0/tcp/0"
  ]
  },
  transports: [
    tcp()
  ],
  peerDiscovery: [
    mdns()
  ],
  services: [
    identify()
  ],
  connectionEncrypters: [
    noise()
  ],
  streamMuxers: [
    yamux()
  ]
}

export default libp2pConfig
