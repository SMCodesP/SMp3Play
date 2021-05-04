import styled from "styled-components";
import { darken, lighten } from "polished";

export const Control = styled.div`
  width: 100%;
  height: 95px;
  display: flex;
  background: ${({ theme }) => lighten(0.1, theme.background)};
  position: fixed;
  bottom: 0;
`;

export const ContainerThumbnail = styled.div`
  height: 72px;
  margin-left: 15px;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  box-shadow: 3px 3px 6px 0 ${({ theme }) => theme.currentLine};
`;

export const Thumbnail = styled.img`
  height: 72px;
  margin-left: 15px;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  box-shadow: 3px 3px 6px 0 ${({ theme }) => theme.currentLine};
  transition: 0.2s filter;

  &:hover {
    filter: brightness(75%);
  }
`;

export const ColumnControl = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Title = styled.p`
  margin-top: calc((95px - 72px) / 2);
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;
`;

export const IconPlay = styled.div`
  background: ${({ theme }) => lighten(0.1, theme.background)};
  cursor: pointer;
  height: 26px;
  width: 26px;
  border-radius: 2px;
  align-self: center;
  transition: 0.2s filter;

  &:hover {
    filter: brightness(75%);
  }
`;

export const ProgressBar = styled.input`
  width: 100%;
  appearance: none;
  height: 3px;
  transition: height 0.2s;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background};

  &:focus {
    outline: none !important;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.pink};
    cursor: pointer;
    outline: none !important;
    border-color: transparent;
    border: 0 !important;
    box-shadow: none !important;
    box-sizing: none;
  }

  &:hover {
    height: 5px;
  }
`;

export const VolumeContainer = styled.div`
  display: none;
  transform: rotateZ(-90deg);
  padding: 0 0 0 10px;
  position: absolute;
  top: -85px;
`;

export const ContainerInformation = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  align-self: center;
  flex-direction: column;
  margin: 0 10px;
  margin-right: 20px;

  &:hover ${VolumeContainer} {
    display: block !important;
  }
`;

export const IconVolume = styled.div`
  cursor: pointer;
`;

export const VolumeControl = styled.div`
  background: ${({ theme }) => lighten(0.1, theme.background)};
  border: 1px solid ${({ theme }) => theme.comment};
  box-shadow: 0 0 2px ${({ theme }) => theme.comment};
  padding: 18px 12px 18px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`;

export const VolumeIndication = styled.p`
  width: 38.67px;
  height: 19px;
  text-align: center;
  align-self: center;
  transform: rotateZ(90deg);
`;

export const ControlVelocity = styled.p`
  height: fit-content;
  align-self: center;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s text-shadow;

  &:hover {
    text-shadow: 0 0 2px #fff;
  }
`;

export const InputVolume = styled.input`
  width: 120px;
  appearance: none;
  height: 5px;
  transition: height 0.2s;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background};

  &:focus {
    outline: none !important;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => darken(0.1, theme.pink)};
    cursor: pointer;
    outline: none !important;
    border-color: transparent;
    border: 0 !important;
    box-shadow: none !important;
    box-sizing: none;
  }

  &:hover {
    height: 6px;
  }
`;

export const ContainerControl = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
