import React from 'react';

import { FaHistory, FaUser, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoHome, IoHomeOutline } from 'react-icons/io5';
import { BsArchive } from 'react-icons/bs';
import { RiFolderMusicFill, RiFolderMusicLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';

import { Container, ListPages, Page, ListPlaylist, Playlist } from './styles';

const Menu: React.FC<{
  selected: string;
}> = ({ selected }) => {
  const theme = useTheme();

  console.log(selected);

  return (
    <Container>
      <ListPages>
        <Page {...(selected === 'home' ? { className: 'selected' } : {})}>
          <div>
            {selected === 'home' ? (
              <IoHome color={theme.purple} size={24} />
            ) : (
              <IoHomeOutline color={theme.purple} size={24} />
            )}
            Página Inicial
          </div>
        </Page>
        <Page {...(selected === 'explore' ? { className: 'selected' } : {})}>
          <div>
            <BsArchive color={theme.purple} size={24} />
            Explorar
          </div>
        </Page>
        <Page {...(selected === 'artist' ? { className: 'selected' } : {})}>
          <div>
            {selected === 'artist' ? (
              <FaUser color={theme.purple} size={24} />
            ) : (
              <svg
                width="21"
                height="28"
                viewBox="0 0 21 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.5 28H5.83333C5.189 28 4.66667 27.4777 4.66667 26.8334C4.66667 26.189 5.189 25.6667 5.83333 25.6667H17.5C18.1443 25.6667 18.6667 25.1444 18.6667 24.5V19.6584C18.6079 19.0037 18.2153 18.4258 17.6283 18.13C13.0554 16.2837 7.94456 16.2837 3.37167 18.13C2.78469 18.4258 2.39206 19.0037 2.33333 19.6584V26.8334C2.33333 27.4777 1.811 28 1.16667 28C0.522335 28 0 27.4777 0 26.8334V19.6584C0.0515927 18.048 1.02237 16.61 2.49667 15.96C7.63057 13.8855 13.3694 13.8855 18.5033 15.96C19.9776 16.61 20.9484 18.048 21 19.6584V24.5C21 26.433 19.433 28 17.5 28ZM16.3333 5.83334C16.3333 2.61167 13.7217 0 10.5 0C7.27834 0 4.66667 2.61167 4.66667 5.83334C4.66667 9.055 7.27834 11.6667 10.5 11.6667C13.7217 11.6667 16.3333 9.055 16.3333 5.83334V5.83334ZM14 5.8333C14 7.7663 12.433 9.3333 10.5 9.3333C8.567 9.3333 7 7.7663 7 5.8333C7 3.90031 8.567 2.3333 10.5 2.3333C12.433 2.3333 14 3.90031 14 5.8333Z"
                  fill={theme.purple}
                />
              </svg>
            )}
            Artístas
          </div>
        </Page>
        <Page
          {...(selected === 'favorites'
            ? { ...{ className: 'selected' } }
            : {})}
        >
          <div>
            {selected === 'favorites' ? (
              <FaHeart color={theme.purple} size={24} />
            ) : (
              <FaRegHeart color={theme.purple} size={24} />
            )}
            Favoritos
          </div>
        </Page>
        <Page {...(selected === 'local' ? { className: 'selected' } : {})}>
          <div>
            {selected === 'local' ? (
              <RiFolderMusicFill color={theme.purple} size={24} />
            ) : (
              <svg
                width="28"
                height="23"
                viewBox="0 0 28 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.9087 22.7498H3.56398C1.59565 22.7498 0 21.1416 0 19.1578V3.59208C0 1.60823 1.59565 0 3.56398 0H10.8939C11.8388 0.000838401 12.7447 0.379838 13.4124 1.05368L14.3985 2.04749C14.6227 2.27161 14.9262 2.39656 15.242 2.39472H21.3839C22.04 2.39472 22.5719 2.9308 22.5719 3.59208C22.5719 4.25336 22.04 4.78944 21.3839 4.78944H15.242C14.297 4.7886 13.3911 4.4096 12.7234 3.73576L11.7374 2.74195C11.5132 2.51782 11.2097 2.39288 10.8939 2.39472H3.56398C2.90787 2.39472 2.37599 2.9308 2.37599 3.59208V19.1578C2.37599 19.819 2.90787 20.3551 3.56398 20.3551H20.9087C21.4089 20.3549 21.8553 20.0389 22.0254 19.5649L25.5894 9.57888H10.3593L8.25655 15.9488C8.04988 16.577 7.37705 16.9175 6.75374 16.7092C6.13044 16.5008 5.79269 15.8227 5.99937 15.1945L8.10211 8.82454C8.42487 7.84441 9.33468 7.18322 10.3593 7.18416H25.625C26.3991 7.18449 27.1246 7.5649 27.5691 8.20363C28.0137 8.84237 28.1216 9.65934 27.8584 10.3931L24.2945 20.3791C23.7799 21.8138 22.4223 22.7644 20.9087 22.7498V22.7498Z"
                  fill={theme.purple}
                />
              </svg>
            )}
            Locais
          </div>
        </Page>
        <Page {...(selected === 'historic' ? { className: 'selected' } : {})}>
          <div>
            <FaHistory color={theme.purple} size={24} />
            Histórico
          </div>
        </Page>
      </ListPages>
      <h2>
        Playlists
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6667 9.33333H16.3333V12.8333H12.8333V15.1667H16.3333V18.6667H18.6667V15.1667H22.1667V12.8333H18.6667V9.33333ZM2.33333 14C2.33333 10.745 4.24667 7.93333 7 6.62667V4.08333C2.91667 5.55333 0 9.43833 0 14C0 18.5617 2.91667 22.4467 7 23.9167V21.3733C4.24667 20.0667 2.33333 17.255 2.33333 14ZM17.5 3.5C11.7133 3.5 7 8.21333 7 14C7 19.7867 11.7133 24.5 17.5 24.5C23.2867 24.5 28 19.7867 28 14C28 8.21333 23.2867 3.5 17.5 3.5ZM17.5 22.1667C12.9967 22.1667 9.33333 18.5033 9.33333 14C9.33333 9.49667 12.9967 5.83333 17.5 5.83333C22.0033 5.83333 25.6667 9.49667 25.6667 14C25.6667 18.5033 22.0033 22.1667 17.5 22.1667Z"
            fill={theme.purple}
          />
        </svg>
      </h2>
      <ListPlaylist>
        <Playlist
          {...(selected === 'rap'
            ? {
                className: 'selected',
              }
            : {})}
        >
          {selected === 'rap' ? (
            <svg
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.67157 0C10.202 0 10.7107 0.210714 11.0858 0.585787L12.5392 2.03921C12.9143 2.41429 13.423 2.625 13.9534 2.625H23.625C25.0687 2.625 26.25 3.79312 26.25 5.25V18.375C26.25 19.8188 25.0687 21 23.625 21H2.625C1.16812 21 0 19.8188 0 18.375V2.625C0 1.16812 1.16812 0 2.625 0H9.67157ZM22.3125 7.875C22.3125 7.15013 21.7249 6.5625 21 6.5625H19.7187C18.6142 6.5625 17.7187 7.45793 17.7187 8.5625V11.2303C17.7187 11.5818 17.4115 11.8544 17.0625 11.8125V11.8125C15.6187 11.8125 14.4375 12.9937 14.4375 14.4375C14.4375 15.8944 15.6187 17.0625 17.0625 17.0625C18.5194 17.0625 19.6875 15.8944 19.6875 14.4375V10.5C19.6875 9.77513 20.2751 9.1875 21 9.1875V9.1875C21.7249 9.1875 22.3125 8.59987 22.3125 7.875V7.875Z"
                fill={theme.purple}
              />
            </svg>
          ) : (
            <svg
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5063 3.24372L12.7626 3.5H13.125H23.625C24.5884 3.5 25.375 4.27922 25.375 5.25V18.375C25.375 19.3355 24.5855 20.125 23.625 20.125H2.625C1.65422 20.125 0.875 19.3384 0.875 18.375V2.625C0.875 1.65137 1.65137 0.875 2.625 0.875H10.1376L12.5063 3.24372ZM23.1875 6.5625V5.6875H22.3125H17.7187H16.8437V6.5625V10.9443C15.0179 11.0579 13.5625 12.584 13.5625 14.4375C13.5625 16.3805 15.1384 17.9375 17.0625 17.9375C19.0026 17.9375 20.5625 16.3776 20.5625 14.4375V10.0625H22.3125H23.1875V9.1875V6.5625Z"
                stroke={theme.purple}
                stroke-width="1.75"
              />
            </svg>
          )}
          Rap's
        </Playlist>
        <Playlist {...(selected === 'trap' ? { className: 'selected' } : {})}>
          {selected === 'trap' ? (
            <svg
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.67157 0C10.202 0 10.7107 0.210714 11.0858 0.585787L12.5392 2.03921C12.9143 2.41429 13.423 2.625 13.9534 2.625H23.625C25.0687 2.625 26.25 3.79312 26.25 5.25V18.375C26.25 19.8188 25.0687 21 23.625 21H2.625C1.16812 21 0 19.8188 0 18.375V2.625C0 1.16812 1.16812 0 2.625 0H9.67157ZM22.3125 7.875C22.3125 7.15013 21.7249 6.5625 21 6.5625H19.7187C18.6142 6.5625 17.7187 7.45793 17.7187 8.5625V11.2303C17.7187 11.5818 17.4115 11.8544 17.0625 11.8125V11.8125C15.6187 11.8125 14.4375 12.9937 14.4375 14.4375C14.4375 15.8944 15.6187 17.0625 17.0625 17.0625C18.5194 17.0625 19.6875 15.8944 19.6875 14.4375V10.5C19.6875 9.77513 20.2751 9.1875 21 9.1875V9.1875C21.7249 9.1875 22.3125 8.59987 22.3125 7.875V7.875Z"
                fill={theme.purple}
              />
            </svg>
          ) : (
            <svg
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5063 3.24372L12.7626 3.5H13.125H23.625C24.5884 3.5 25.375 4.27922 25.375 5.25V18.375C25.375 19.3355 24.5855 20.125 23.625 20.125H2.625C1.65422 20.125 0.875 19.3384 0.875 18.375V2.625C0.875 1.65137 1.65137 0.875 2.625 0.875H10.1376L12.5063 3.24372ZM23.1875 6.5625V5.6875H22.3125H17.7187H16.8437V6.5625V10.9443C15.0179 11.0579 13.5625 12.584 13.5625 14.4375C13.5625 16.3805 15.1384 17.9375 17.0625 17.9375C19.0026 17.9375 20.5625 16.3776 20.5625 14.4375V10.0625H22.3125H23.1875V9.1875V6.5625Z"
                stroke={theme.purple}
                stroke-width="1.75"
              />
            </svg>
          )}
          Trap's
        </Playlist>
        <Playlist {...(selected === 'funk' ? { className: 'selected' } : {})}>
          {selected === 'funk' ? (
            <svg
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.67157 0C10.202 0 10.7107 0.210714 11.0858 0.585787L12.5392 2.03921C12.9143 2.41429 13.423 2.625 13.9534 2.625H23.625C25.0687 2.625 26.25 3.79312 26.25 5.25V18.375C26.25 19.8188 25.0687 21 23.625 21H2.625C1.16812 21 0 19.8188 0 18.375V2.625C0 1.16812 1.16812 0 2.625 0H9.67157ZM22.3125 7.875C22.3125 7.15013 21.7249 6.5625 21 6.5625H19.7187C18.6142 6.5625 17.7187 7.45793 17.7187 8.5625V11.2303C17.7187 11.5818 17.4115 11.8544 17.0625 11.8125V11.8125C15.6187 11.8125 14.4375 12.9937 14.4375 14.4375C14.4375 15.8944 15.6187 17.0625 17.0625 17.0625C18.5194 17.0625 19.6875 15.8944 19.6875 14.4375V10.5C19.6875 9.77513 20.2751 9.1875 21 9.1875V9.1875C21.7249 9.1875 22.3125 8.59987 22.3125 7.875V7.875Z"
                fill={theme.purple}
              />
            </svg>
          ) : (
            <svg
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5063 3.24372L12.7626 3.5H13.125H23.625C24.5884 3.5 25.375 4.27922 25.375 5.25V18.375C25.375 19.3355 24.5855 20.125 23.625 20.125H2.625C1.65422 20.125 0.875 19.3384 0.875 18.375V2.625C0.875 1.65137 1.65137 0.875 2.625 0.875H10.1376L12.5063 3.24372ZM23.1875 6.5625V5.6875H22.3125H17.7187H16.8437V6.5625V10.9443C15.0179 11.0579 13.5625 12.584 13.5625 14.4375C13.5625 16.3805 15.1384 17.9375 17.0625 17.9375C19.0026 17.9375 20.5625 16.3776 20.5625 14.4375V10.0625H22.3125H23.1875V9.1875V6.5625Z"
                stroke={theme.purple}
                stroke-width="1.75"
              />
            </svg>
          )}
          Funk's
        </Playlist>
      </ListPlaylist>
    </Container>
  );
};

export default Menu;
