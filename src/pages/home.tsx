import React from "react";

import ContainerPage from "../components/ContainerPage";
import VerticalMenu from "../components/VerticalMenu";
import PlaylistComponent from "../components/Playlist";

import { usePlaylists } from "../contexts/playlists";

import { PlaylistAdd } from "../styles/pages/playlists";

const Home = () => {
  const { playlists } = usePlaylists();

  return (
    <ContainerPage>
      <VerticalMenu selected="home" />

      <div
        style={{
          margin: 15,
        }}
      >
        <h1>Suas playlists</h1>
        {playlists && playlists.length !== 0 ? (
          <div
            style={{
              margin: "10px 5px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(315px, 1fr))",
              gridGap: "20px",
            }}
          >
            {playlists.slice(0, 3).map((playlist) => (
              <PlaylistComponent playlist={playlist} key={playlist.id} />
            ))}
            {playlists.length >= 3 && (
              <a href="#/smp3/playlists">
                <PlaylistAdd>
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: 65,
                      fontWeight: 400,
                    }}
                  >
                    ...
                  </h1>
                </PlaylistAdd>
              </a>
            )}
          </div>
        ) : (
          <h2
            style={{
              margin: "15px 30px",
            }}
          >
            Nenhuma playlist criada até o momento
          </h2>
        )}
      </div>
    </ContainerPage>
  );
};

export default Home;
