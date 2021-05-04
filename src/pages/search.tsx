import React, { useContext, useState } from "react";

import { Player } from "@lottiefiles/react-lottie-player";
import { useDebouncedCallback } from "use-debounce";

import ContainerPage from "../components/ContainerPage";
import VerticalMenu from "../components/VerticalMenu";
import VideoComponent from "../components/Video";
import { Video } from "../interfaces/Video";

import { usePlayer } from "../contexts/player";

import {
  Container,
  ContainerInput,
  ContainerVideos,
  SearchIcon,
  SearchInput,
} from "../styles/pages/search";
import { ThemeContext } from "styled-components";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);

  const { playSound } = usePlayer();
  const theme = useContext(ThemeContext);

  const searchVideos = useDebouncedCallback(() => {
    if (searchText.length === 0) return setVideos([]);

    if (loading) return;

    setLoading(true);

    fetch(`https://sm-p3-play-api.vercel.app/api/search?q=${searchText}`)
      .then((response) => {
        return response.json();
      })
      .then((response: { videos: Video[] }) => {
        setVideos(response.videos);
        setLoading(false);
      })
      .catch((error) => {
        alert(`Houve um erro ao pesquisar os videos: ${error}`);
      });
  }, 1500);

  const onFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    searchVideos();
  };

  return (
    <ContainerPage>
      <VerticalMenu selected="search" />

      <Container>
        <ContainerInput onSubmit={onFormSubmit}>
          <SearchInput
            name="search"
            type="text"
            placeholder="Pesquisa uma música aqui."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              searchVideos();
            }}
          />
          <hr className="line" />
          <div onClick={searchVideos}>
            <SearchIcon size={18} color={theme.pink} />
          </div>
        </ContainerInput>

        {loading ? (
          <Player
            autoplay={true}
            loop={true}
            src="https://assets7.lottiefiles.com/datafiles/Diiccbibc5RWV4v/data.json"
            style={{ height: "450px", width: "450px" }}
          ></Player>
        ) : videos.length === 0 ? (
          <center>
            <h1>Pesquise uma música para ouvir</h1>
          </center>
        ) : (
          <ContainerVideos>
            {videos.map((video) => (
              <VideoComponent
                key={video.videoId}
                video={video}
                playSound={playSound || function (video: Video) {}}
              />
            ))}
          </ContainerVideos>
        )}
      </Container>
    </ContainerPage>
  );
};

export default Search;
