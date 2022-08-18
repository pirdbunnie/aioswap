import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import Swap from "./components/Swap";
import SwapTest from "./components/Swap/SwapTest";
import { ModalWarning, ModalTokenSelect } from "./components/Modal";
import { Box, ChakraProvider } from '@chakra-ui/react';
import { IsMetaMaskInstall } from "./globals/EthersWrap";
import AccountContextProvider from "./contexts/Account";

const Background = ({ children }) => {
    return (
        <Box bg="gray.600" w="100vw" h="100vh">
            {children}
        </Box>
    )
}

const App = () => {
    useEffect(() => {
        document.title = "aioswap";
    }, []);

    const [showMetaMaskWarning, setShowMetaMaskWarning] = useState(false);
    const [showNetworkWarning, setShowNetworkWarning] = useState(false);
    const [showTokenList, setShowTokenList] = useState(false);

    useEffect(() => {
        if (!IsMetaMaskInstall()) {
            setShowMetaMaskWarning(true);
        }
    }, []);

    return (
        <AccountContextProvider>
            <ChakraProvider>
                <Background>
                    <ModalWarning
                        title="Metamask not detected"
                        isOpen={showMetaMaskWarning}
                        onClose={() => setShowMetaMaskWarning(false)}
                    >
                        {`You should install metamask extension first, and refresh this page.`}
                    </ModalWarning>
                    <ModalWarning
                        title="Wrong Network"
                        isOpen={showNetworkWarning}
                        onClose={() => setShowNetworkWarning(false)}
                    >
                        {`Your wallet is not corrected to the right network, please connect to the hardhat local network at http://localhost:8545`}
                    </ModalWarning>
                    <ModalTokenSelect isOpen={showTokenList} onClose={() => setShowTokenList(false)} />
                    <Header />
                    <Swap />
                    <SwapTest />
                </Background>
            </ChakraProvider>
        </AccountContextProvider>
    )
};

export default App;