import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

import LoadingWrapper from "@/components/LoadingWrapper";
import CollectibleCard from "@/components/CollectibleCard";
import LoginWithMagic from "@/components/LoginWithMagic";
import MintNFTButton from "@/components/MintNFTButton";

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
      <section className="video-section">
        <div className="left">
          <div id="menu-btn">
            <i className="uil uil-bars" />
          </div>
          <div className="left-content">
            <div className="hidde">
              {" "}
              <button className="hide" onclick="handlediv()">
                <i className="fa-sharp fa-solid fa-caret-down" />
              </button>
            </div>
            <div className="list">
              <div className="btnn">
                <button>Collection</button>
              </div>
              <div className="list-item" id="coll">
                <a
                  style={{
                    fontSize: "1.3rem",
                    color: "white",
                    background: "black",
                    border: "none",
                    padding: ".3rem .9em",
                    textDecoration: "none"
                  }}
                  href="./index1"
                >
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="video" style={{ display: "none" }} id="video">
          <h1 id="title" style={{ textAlign: "center" }} />
          <div className="video-full">
            {" "}
            <video controls="" src="./image/demo-video.mp4" id="videoPlay" />
          </div>
          <div className="controols">
            <a href="#">
              <button id="prev" onclick="prevVideo()">
                Prev
              </button>
            </a>
            <a href="#">
              <button id="next" onclick="nextVideo()">
                Next
              </button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
