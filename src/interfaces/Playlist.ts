import { Video } from './Video'

export interface Playlist {
    id: string;
    name: string;
    musics?: Video[];
    checkedDownload?: boolean;
}