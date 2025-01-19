import {PlayerType} from "../types/Player.ts";

export const changeFavicon = (type: PlayerType) => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    switch (type) {
        case "X":
            link.href = '/src/assets/images/game/cross.svg';
            break;
        case "O":
            link.href = '/src/assets/images/game/circle.svg';
            break;
        case "":
            link.href = '/public/favicon.webp';
            break;
        default:
            break;
    }
}