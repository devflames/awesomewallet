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
      <div className="layout">
        <button className="hide" onclick="handlediv()">
          <i className="fa-sharp fa-solid fa-caret-down" />
        </button>
        <button className="collector" onclick="handlebtn()">
          Collections
        </button>
        <button onclick="clickedbtn()" className="fas fa-bars" id="menu" />
        <button onclick="clickedcross()" className="fas fa-times" id="menus" />
        <div className="links" id="linkss">
          <div className="collection">
            <div className="button">
              <a className="btn" href="#">
                Collection
              </a>
              <i className="fas fa-plus" />
            </div>
            <div className="link">
              <a>DJ Jack Hollywood</a>
              <a href="">KingGizzard and the Liz</a>
              <a>Pigs x9</a>
              <a>Trojan Records</a>
              <a>Manson's Medicine</a>
              <a>Trey Bake</a>
              <a>The Sailor's Taylor</a>

              <div className="button">
                <a className="btn" href="./index1">
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="top">
            <div className="image">
              <img src="./image/faded.png" alt="" />
            </div>
          </div>
        </div>
        <div className="player">
          <div className="wrapper">
            <div className="data">
              <div className="track-art" />
              <div className="data-details">
                <div className="track-name">Track Name</div>
                <div className="track-artist">Track Artist</div>
                <div className="now-playing">PLAYING x OF y</div>
              </div>
            </div>
            <div className="wrapper-box">
              <div className="slider_container" id="controller">
                <div className="current-time">00:00</div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  defaultValue={0}
                  className="seek_slider"
                  onchange="seekTo()"
                />
                <div className="total-duration">00:00</div>
              </div>
              <div className="slider_container">
                <i className="fa fa-volume-up" id="volume_icon" />
                <input
                  type="range"
                  min={1}
                  max={100}
                  defaultValue={99}
                  className="volume_slider"
                  onchange="setVolume()"
                />
              </div>
              <div className="buttons">
                {/* <div class="random-track" onclick="randomTrack()">
                      <i class="fas fa-random fa-2x" title="random"></i>
                  </div> */}
                <div className="prev-track" onclick="prevTrack()">
                  <i className="fa fa-step-backward fa-2x" />
                </div>
                <div className="playpause-track" onclick="playpauseTrack()">
                  <i className="fa fa-play-circle fa-5x" id="pause" />
                </div>
                <div className="next-track" onclick="nextTrack()">
                  <i className="fa fa-step-forward fa-2x" />
                </div>
                <div className="repeat-track" onclick="repeatTrack()">
                  <i className="fa fa-repeat fa-2x" title="repeat" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </Layout>
  );
}
