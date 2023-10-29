import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import Web3 from "web3";
import { contractABI } from "../lib/abi";
import { magic } from "../lib/magic";
import { utils } from "ethers";



// Define the structure of the Web3 context state
type Web3ContextType = {
    web3: Web3 | null;
    initializeWeb3: () => void;
    contract: any;
    isAccountChanged: boolean;
};

// Define contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Create the context with default values
const Web3Context = createContext<Web3ContextType>({
    web3: null,
    initializeWeb3: () => { },
    contract: null,
    isAccountChanged: false,
});

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

// Provider component to wrap around components that need access to the context
export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    // State variable to hold an instance of Web3 and the contract
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any | null>(null);
    const [isAccountChanged, setIsAccountChanged] = useState<boolean>(false);

    // Initialize Web3
    const initializeWeb3 = useCallback(async () => {
        try {
            // Get the provider from the Magic instance
            const provider = await magic.wallet.getProvider();

            // Create a new instance of Web3 with the provider
            const web3Instance = new Web3(provider);

            // Subscribe to accounts changed event
            provider.on("accountsChanged", async () => {
                setIsAccountChanged((state) => !state);
            });

            // Subscribe to chain changed event
            provider.on("chainChanged", async () => {
                const chainId = await web3Instance.eth.getChainId();
                const maticTestnetChainId = 80001; // Replace with the appropriate Polygon (Matic) testnet chain ID
                if (chainId !== maticTestnetChainId) {
                    alert("Please switch to the Polygon (Matic) testnet");
                }
            });

            // Create a contract instance
            const contractInstance = new web3Instance.eth.Contract(
                contractABI as any,
                CONTRACT_ADDRESS,
            );

            // Save the instance to state
            setWeb3(web3Instance);
            setContract(contractInstance);
        } catch (error) {
            console.error("Failed to initialize web3 or contract", error);
        }
    }, []);

    // Effect to initialize Web3 when the component mounts
    useEffect(() => {
        initializeWeb3();
    }, []);


    // Function to flip the sale state
    async function flipState(): Promise<void> {
        try {
            await contract.flipSaleState();
            alert("Success!");
        } catch (err) {
            alert((err as any).data.message);
        }
    }

    let inputs: number; // You can define it as a global variable
    function getNameInput(): void {
        const songsInput = document.getElementById("songsN") as HTMLInputElement | null;
        const inputContainer = document.getElementById("input");
        const songs = songsInput ? parseInt(songsInput.value, 10) : 0;

        inputs = songs; // Assign the value to the global variable

        if (inputContainer) {
            while (inputContainer.hasChildNodes()) {
                inputContainer.removeChild(inputContainer.firstChild);
            }

            for (let i = 0; i < songs; i++) {
                const inp = document.createElement("input");
                inp.type = "text";
                inp.setAttribute("id", "input" + i);
                inp.setAttribute("placeholder", "Song Name" + i);
                inputContainer.appendChild(inp);
            }

            const albumID = document.createElement("input");
            albumID.type = "number";
            albumID.setAttribute("placeholder", "Album ID");
            albumID.setAttribute("id", "albID");
            inputContainer.appendChild(albumID);

            const btn = document.createElement("button");
            btn.addEventListener("click", setNames);
            btn.innerHTML = "Set Names";
            inputContainer.appendChild(btn);
        }
    }

    async function addAlbum(): Promise<void> {
        const priceInput = document.getElementById("price") as HTMLInputElement | null;
        const titleInput = document.getElementById("title") as HTMLInputElement | null;
        const artistInput = document.getElementById("artist") as HTMLInputElement | null;
        const imageInput = document.getElementById("image") as HTMLInputElement | null;
        const songInput = document.getElementById("song") as HTMLInputElement | null;
        const videoInput = document.getElementById("video") as HTMLInputElement | null;
        const artInput = document.getElementById("art") as HTMLInputElement | null;
        const descInput = document.getElementById("desc") as HTMLInputElement | null;

        if (
            priceInput &&
            titleInput &&
            artistInput &&
            imageInput &&
            songInput &&
            videoInput &&
            artInput &&
            descInput
        ) {
            const price = parseFloat(priceInput.value);
            const title = titleInput.value;
            const artist = artistInput.value;
            const image = imageInput.value;
            const song = songInput.value;
            const video = videoInput.value;
            const art = artInput.value;
            const desc = descInput.value;

            try {
                await contract.addAlbum(
                    utils.parseUnits(price.toString(), 18),
                    title,
                    artist,
                    image,
                    song,
                    video,
                    art,
                    desc
                );
                alert("Album added successfully!");
            } catch (err) {
                alert((err as any).data.message);
            }
        }
    }

    async function setNames(): Promise<void> {
        const albumIDInput = document.getElementById("albID") as HTMLInputElement | null;
        const albID = albumIDInput ? parseInt(albumIDInput.value, 10) : 0;
        const arr: string[] = [];

        for (let i = 0; i < inputs; i++) {
            const inputElement = document.getElementById("input" + i) as HTMLInputElement | null;
            if (inputElement) {
                arr.push(inputElement.value);
            }
        }

        try {
            await contract.setSongName(arr, albID);
            alert("Names added successfully!");
        } catch (err) {
            alert((err as any).data.message);
        }
    }

    async function withdraw(): Promise<void> {
        try {
            await contract.withdrawAll();
            alert("Withdrawn successfully!");
        } catch (err) {
            alert((err as any).data.message);
        }
    }


    export {
        flipState,
        addAlbum,
        setNames,
        withdraw,
    };