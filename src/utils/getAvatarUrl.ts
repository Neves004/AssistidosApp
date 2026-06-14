import { ASSISTIDOS_API } from "@/api/assistidos";

export function getAvatarUrl(path?: string | null) {
    if (!path || path.trim() === '') {
        return 'https://i.imgur.com/placeholder.png';
    }

    const base = ASSISTIDOS_API.base_url.replace(/\/$/, '');
    const cleanPath = path.replace(/^\/+/, '');

    return `${base}/${cleanPath}`;
}