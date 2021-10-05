import { InjectedConnector } from '@web3-react/injected-connector'

const RPC_URLS: { [chainId: number]: string } = {
	1337: "ws://localhost:8545",
}

export const MetaMask = new InjectedConnector({ supportedChainIds: [1337] })
