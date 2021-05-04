import React, { useEffect, useState, createRef, useContext } from "react";

import { v4 as uuidv4 } from "uuid";
import { ImSearch } from "react-icons/im";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { Player } from "@lottiefiles/react-lottie-player";

import ContainerPage from "../components/ContainerPage";
import PlaylistComponent from "../components/Playlist";
import VerticalMenu from "../components/VerticalMenu";

import { usePlaylists } from "../contexts/playlists";

import {
  Container,
  ContainerInput,
  ContainerPlaylists,
  InputNewPlaylist,
  ModalInputNewPlaylist,
  PlaylistAdd,
  Search,
  SearchInput,
} from "../styles/pages/playlists";
import { ThemeContext } from "styled-components";

const Playlists = () => {
  const [searchText, setSearchText] = useState("");
  const [newPlaylist, setNewPlaylist] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { playlists, createPlaylist } = usePlaylists();
  const theme = useContext(ThemeContext);

  const inputNewPlaylist = createRef<HTMLInputElement>();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setNewPlaylist("");
    setTimeout(() => {
      if (openModal && inputNewPlaylist.current) {
        inputNewPlaylist.current.focus();
        inputNewPlaylist.current.select();
      }
    }, 100);
  }, [openModal]);

  function handleSubmitNewPlaylist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (createPlaylist) {
      createPlaylist({
        id: uuidv4(),
        name: newPlaylist,
        musics: [],
      });
    }
    setOpenModal(false);
  }

  const searchHandleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <ContainerPage>
      <VerticalMenu selected="playlists" />

      <Container>
        <br />
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Playlists
        </h1>

        <ContainerInput onSubmit={searchHandleSubmit}>
          <SearchInput
            name="search"
            type="text"
            placeholder="Pesquise uma playlist aqui."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <hr className="line" />
          <Search size={18} color={theme.pink} />
        </ContainerInput>

        {loading ? (
          <Player
            autoplay={true}
            loop={true}
            src="https://assets7.lottiefiles.com/datafiles/Diiccbibc5RWV4v/data.json"
            style={{ height: "450px", width: "450px" }}
          ></Player>
        ) : (
          <ContainerPlaylists>
            <PlaylistAdd onClick={() => setOpenModal(true)}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: 65,
                  fontWeight: 400,
                }}
              >
                +
              </h1>
            </PlaylistAdd>
            {playlists &&
              playlists
                .filter((playlist) =>
                  playlist.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((playlist) => (
                  <PlaylistComponent playlist={playlist} key={playlist.id} />
                ))}
          </ContainerPlaylists>
        )}
      </Container>
      <ModalInputNewPlaylist
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="modalInputNewPlaylist"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <form onSubmit={handleSubmitNewPlaylist}>
            <InputNewPlaylist
              ref={inputNewPlaylist}
              type="text"
              placeholder="Digite o nome da nova playlist."
              value={newPlaylist}
              onChange={(e) => setNewPlaylist(e.target.value)}
            />
          </form>
        </Fade>
      </ModalInputNewPlaylist>
    </ContainerPage>
  );
};

export default Playlists;
