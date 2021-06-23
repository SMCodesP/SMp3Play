import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 235px;
  height: 100vh;
  background: linear-gradient(
    30deg,
    ${({ theme }) => theme.background},
    ${({ theme }) => theme.currentLine}
  );
  box-shadow: 0 0 5px ${({ theme }) => theme.comment};
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 15px;
    color: ${({ theme }) => theme.purple};
    font-size: 28px;
    font-weight: bold;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & svg {
      cursor: pointer;
      transition: filter 0.4s;
    }

    & svg:hover {
      filter: brightness(50%);
    }
  }
`;

export const ListPages = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
`;

export const Page = styled.li`
  list-style: none;
  padding: 10px 15px;
  color: ${({ theme }) => theme.purple};
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background 0.4s;

  &:hover {
    background: ${({ theme }) => theme.comment};
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  &.selected div {
    gap: 10px;
    filter: brightness(65%);
  }

  &.selected {
    background-image: #ff99fa;
    background-image: radial-gradient(
        at 71% 14%,
        hsla(27, 88%, 65%, 0.75) 0,
        transparent 42%
      ),
      radial-gradient(at 44% 63%, hsla(287, 69%, 72%, 0.75) 0, transparent 49%),
      radial-gradient(at 60% 19%, hsla(305, 60%, 76%, 0.75) 0, transparent 51%),
      radial-gradient(at 51% 82%, hsla(269, 78%, 66%, 0.75) 0, transparent 49%),
      radial-gradient(at 40% 34%, hsla(158, 63%, 72%, 0.75) 0, transparent 53%),
      radial-gradient(at 97% 53%, hsla(78, 61%, 62%, 0.75) 0, transparent 45%),
      radial-gradient(at 45% 41%, hsla(164, 85%, 64%, 0.75) 0, transparent 53%),
      radial-gradient(at 4% 34%, hsla(358, 96%, 77%, 0.75) 0, transparent 50%),
      radial-gradient(at 2% 24%, hsla(175, 85%, 63%, 0.75) 0, transparent 51%),
      radial-gradient(at 47% 50%, hsla(74, 95%, 68%, 0.75) 0, transparent 51%),
      radial-gradient(at 48% 61%, hsla(212, 86%, 72%, 0.75) 0, transparent 47%),
      radial-gradient(at 96% 24%, hsla(340, 82%, 60%, 0.75) 0, transparent 58%),
      radial-gradient(at 79% 14%, hsla(127, 66%, 68%, 0.75) 0, transparent 43%),
      radial-gradient(at 51% 38%, hsla(306, 63%, 76%, 0.75) 0, transparent 42%),
      radial-gradient(at 8% 92%, hsla(133, 83%, 74%, 0.75) 0, transparent 51%),
      radial-gradient(at 13% 18%, hsla(253, 96%, 64%, 0.75) 0, transparent 42%),
      radial-gradient(at 0% 10%, hsla(103, 87%, 63%, 0.75) 0, transparent 56%),
      radial-gradient(at 54% 80%, hsla(267, 63%, 61%, 0.75) 0, transparent 40%),
      radial-gradient(at 41% 2%, hsla(58, 96%, 61%, 0.75) 0, transparent 42%),
      radial-gradient(at 44% 33%, hsla(92, 95%, 65%, 0.75) 0, transparent 51%),
      radial-gradient(at 85% 10%, hsla(282, 68%, 67%, 0.75) 0, transparent 40%),
      radial-gradient(at 88% 44%, hsla(78, 70%, 70%, 0.75) 0, transparent 51%),
      radial-gradient(at 70% 75%, hsla(7, 66%, 69%, 0.75) 0, transparent 45%),
      radial-gradient(at 61% 81%, hsla(168, 61%, 76%, 0.75) 0, transparent 57%);
  }
`;

export const ListPlaylist = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
`;

export const Playlist = styled.li`
  list-style: none;
  padding: 10px 15px;
  color: ${({ theme }) => theme.purple};
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background 0.4s;

  &:hover {
    background: ${({ theme }) => theme.comment};
  }

  &.selected {
    background: ${({ theme }) => theme.comment};
  }
`;
