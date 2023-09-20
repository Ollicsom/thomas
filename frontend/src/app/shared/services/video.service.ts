import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';

@Injectable()
export class VideoService {

    private videoList = [
        {
            id: 1,
            title: 'GOGUENARD',
            date: '2023',
            thumbnailUrl: 'assets/medias/1.jpg',
            context: '',
            presta: '',
            URL: 'https://www.youtube.com/watch?v=nc_y-SEL8F0&ab_channel=MultimediaCHEVALLET'
        },
        {
            id: 2,
            title: 'Portrait de Annaëve SAÏAG - Responsable Communication et Marketing à Tënk',
            date: '2023',
            thumbnailUrl: 'assets/medias/2.jpg',
            context: '',
            presta: '',
            URL: 'https://vimeo.com/822437601/4b785ee3dc'
        },
        {
            id: 3,
            title: 'Portrait de Elie CATTAN - Programmateur de festival',
            date: '2023',
            thumbnailUrl: 'assets/medias/3.png',
            context: '',
            presta: '',
            URL: 'https://vimeo.com/822345024/3d70fd85ee'
        },
        {
            id: 4,
            title: 'Portrait de BETTINA DELAVEAUD – Coordinatrice générale du salon Indie Game Lyon',
            date: '2023',
            thumbnailUrl: 'assets/medias/4.png',
            context: '',
            presta: '',
            URL: 'https://vimeo.com/822345024/3d70fd85ee'
        },
        {
            id: 5,
            title: 'Léon remake d’une scène',
            date: '2022',
            thumbnailUrl: 'assets/medias/5.jpg',
            context: '',
            presta: '',
            URL: 'https://www.youtube.com/watch?v=PkLBuAGGQQc'
        },
        {
            id: 6,
            title: 'Jeudi Gris',
            date: '2022',
            thumbnailUrl: 'assets/medias/6.jpg',
            context: '',
            presta: '',
            URL: 'https://studio.youtube.com/video/kDbnWqXfZxE/edit'
        },
        {
            id: 7,
            title: 'La vie est douce',
            date: '2022',
            thumbnailUrl: 'assets/medias/7.jpg',
            context: '',
            presta: '',
            URL: 'https://www.youtube.com/watch?v=Nnq39JH_pxM'
        },
        {
            id: 8,
            title: 'Grenoble encore mieux',
            date: '2022',
            thumbnailUrl: 'assets/medias/8.jpg',
            context: '',
            presta: '',
            URL: 'https://www.youtube.com/watch?v=c_QRi9pnR1I'
        },
        {
            id: 9,
            title: 'Prenez le temps de rester',
            date: '2022',
            thumbnailUrl: 'assets/medias/9.jpg',
            context: '',
            presta: '',
            URL: 'https://www.youtube.com/watch?v=-0mBz56yY6s'
        },
        {
            id: 10,
            title: 'Aura’zar Annaëve Saïag',
            date: '2023',
            thumbnailUrl: 'assets/medias/10.jpg',
            context: '',
            presta: '',
            URL: 'https://vimeo.com/821677294/e71cd8efd1'
        },
        {
            id: 11,
            title: 'Aura’zar de Elie Cattan',
            date: '2023',
            thumbnailUrl: 'assets/medias/11.jpg',
            context: '',
            presta: '',
            URL: 'https://vimeo.com/821678956/301e769d31'
        },
        {
            id: 12,
            title: 'Aura’zar de Bettina Delaveaud',
            date: '2023',
            thumbnailUrl: 'assets/medias/12.jpg',
            context: '',
            presta: '',
            URL: 'https://vimeo.com/821675585/cf9ff5bd7e'
        },
    ];


    constructor(
    ) { }

    public getVideos(): Array<Video> {
        return this.videoList;
    }
}
