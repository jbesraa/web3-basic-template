import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import React, { createContext, useState } from "react";
import { MetaMask } from "./connectors";
import { useEagerConnect, useInactiveListener } from "./hooks";

interface Wallet {};
interface Web3State {
	connectToMetaMask: () => void,
	wallet: Wallet,
	context: Web3ReactContextInterface<Web3Provider>
};

const initialWeb3State: Web3State = {
	connectToMetaMask: () => {},
	wallet: {} as Wallet,
	context: {} as Web3ReactContextInterface<Web3Provider>
};

const initialWalletState: Wallet = {};

export const Web3Context = createContext(initialWeb3State);

export const Web3ContextProvider = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const context = useWeb3React<Web3Provider>();
	const [wallet, setWallet] = useState(initialWalletState);
	const { connector } = context;

	// handle logic to recognize the connector currently being activated
	const [activatingConnector, setActivatingConnector] = React.useState<any>();
	React.useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect();

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector);

	const connectToMetaMask = (): void => {
		if (context.active) {
			context.deactivate();
		} else {
			context.activate(MetaMask);
		}
	}


	const web3: Web3State = {
		connectToMetaMask,
		wallet,
		context,
	};

	return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};
