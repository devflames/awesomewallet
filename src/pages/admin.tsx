import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

import LoadingWrapper from "@/components/LoadingWrapper";
import CollectibleCard from "@/components/CollectibleCard";
import LoginWithMagic from "@/components/LoginWithMagic";
import MintNFTButton from "@/components/MintNFTButton";

async function flipState(): Promise<void> {
  try {
    await contract.flipSaleState();
    alert("Success!");
  } catch (err) {
    alert((err as any).data.message);
  }
}

function getNameInput() {
  // Your existing code for creating input fields and buttons.
  // No changes are needed for the network switch.
}

async function addAlbum() {
  var price = document.getElementById("price").value;
  var title = document.getElementById("title").value;
  var artist = document.getElementById("artist").value;
  var image = document.getElementById("image").value;
  var song = document.getElementById("song").value;
  var video = document.getElementById("video").value;
  var art = document.getElementById("art").value;
  var desc = document.getElementById("desc").value;

  try {
    await contractInstance.methods.addAlbum(
      web3Instance.utils.toWei(price.toString(), "ether"),
      title,
      artist,
      image,
      song,
      video,
      art,
      desc
    ).send({ from: YOUR_ADDRESS }); // Replace YOUR_ADDRESS with your wallet address
    alert("Album added successfully!");
  } catch (err) {
    alert(err.message);
  }
}

async function setNames() {
  var arr = [];
  var albID = document.getElementById("albID").value;
  for (var i = 0; i < inputs; i++) {
    arr.push(document.getElementById("input" + i).value);
  }

  try {
    await contractInstance.methods.setSongName(arr, albID).send({ from: YOUR_ADDRESS }); // Replace YOUR_ADDRESS with your wallet address
    alert("Names added successfully!");
  } catch (err) {
    alert(err.message);
  }
}

async function withdraw() {
  try {
    await contractInstance.methods.withdrawAll().send({ from: YOUR_ADDRESS }); // Replace YOUR_ADDRESS with your wallet address
    alert("Withdrawn successfully!");
  } catch (err) {
    alert(err.message);
  }
}

export default function CollectiblesPage() {
  const { user } = useUser();

  // initialize the state used to track the current page's data
  const [loading, setLoading] = useState(user?.refreshCollectibles);

  useEffect(() => {
    // do nothing if the user is not logged in
    if (!user?.address) {
      setLoading(true);
      return;
    }

    // disable the loading after collectibles have already been loaded
    if (user?.address && !user?.refreshCollectibles && user?.collectibles) {
      setLoading(false);
      return;
    }
  }, [user?.address, user?.refreshCollectibles, user?.collectibles]);


  return (
    <Layout title="My Collection" className="">
      <section className="hero">
        <h1>My Collection</h1>

        <p>Users can see their purchased Music NFTs.</p>
      </section>

      <LoadingWrapper>
        {user?.address ? (
          <>
            <MintNFTButton
              buttonText={
                user?.collectibles?.length > 0
                  ? "Mint another NFT Album"
                  : "Mint an NFT Album"
              }
              className="mx-auto text-center"
            />

            <LoadingWrapper loading={loading}>
              <div className="flex justify-center">
                <section className="mx-auto inline-grid gap-8 md:grid-cols-3 lg:grid-cols-4">
                  {user?.collectibles?.map((uri, id) => (
                    <CollectibleCard key={id} tokenURI={uri} />
                  ))}
                </section>
              </div>
            </LoadingWrapper>
          </>
        ) : (
          <section className="space-y-3 py-10 text-center">
            <LoginWithMagic />
          </section>
        )}
      </LoadingWrapper>

      <h1>FLIP STATE</h1>
      <button onClick={flipState} className="btn">Flip State</button>

      <div className="form-container">
        <h1>ADD ALBUM</h1>
        <input className="input" id="price" placeholder="Price" type="number" step=".01" />
        <input className="input" id="title" placeholder="Title" type="text" />
        <input className="input" id="artist" placeholder="Artist" type="text" />
        <input className="input" id="image" placeholder="Image" type="text" />
        <input className="input" id="song" placeholder="Songs" type="number" />
        <input className="input" id="video" placeholder="Video" type="number" />
        <input className="input" id="art" placeholder="Art" type="number" />
        <input className="input" id="desc" placeholder="Descr" type="text" />
        <button onClick={addAlbum} className="btn">Add Album</button>
      </div>

      <div>
        <h1>SET SONG NAMES</h1>
        <input className="input" type="number" placeholder="How many Songs?" id="songsN" />
        <button onClick={getNameInput} className="btn">Generate inputs</button>
      </div>

      <div id="input" />

      <div>
        <h1>WITHDRAW</h1>
        <button onClick={withdraw} className="btn">Withdraw</button>
      </div>
    </Layout>
  );
}
