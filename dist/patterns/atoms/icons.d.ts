/**
 * The icon set of the admin UIs, collected so every glyph shares one stroke weight and viewBox.
 *
 * `stroke` icons are drawn with `currentColor` outlines; `fill` icons (the thumbs) are solid.
 */
export interface IconDef {
    paths: readonly string[];
    fill?: boolean;
    strokeWidth?: number;
}
export declare const icons: {
    readonly search: {
        readonly paths: readonly ["M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0z", "m20 20-3.5-3.5"];
        readonly strokeWidth: 2.2;
    };
    readonly refresh: {
        readonly paths: readonly ["M21 12a9 9 0 1 1-2.64-6.36", "M21 3v6h-6"];
        readonly strokeWidth: 2.2;
    };
    readonly reload: {
        readonly paths: readonly ["M20 11a8 8 0 1 0-2.34 5.66M20 5v6h-6"];
    };
    readonly plus: {
        readonly paths: readonly ["M12 5v14M5 12h14"];
        readonly strokeWidth: 2.2;
    };
    readonly check: {
        readonly paths: readonly ["M5 12.5l4.5 4.5L19 7.5"];
        readonly strokeWidth: 2.4;
    };
    readonly close: {
        readonly paths: readonly ["M6 6l12 12M18 6 6 18"];
    };
    readonly trash: {
        readonly paths: readonly ["M4 7h16", "M10 11v6M14 11v6", "M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12", "M9 7V4h6v3"];
    };
    readonly 'chevron-down': {
        readonly paths: readonly ["M6 9l6 6 6-6"];
    };
    readonly 'chevron-left': {
        readonly paths: readonly ["M15 6l-6 6 6 6"];
    };
    readonly 'chevron-right': {
        readonly paths: readonly ["M9 6l6 6-6 6"];
    };
    readonly wrap: {
        readonly paths: readonly ["M4 6h16M4 12h13a3 3 0 0 1 0 6h-4m0 0l2-2m-2 2l2 2M4 18h5"];
    };
    readonly 'sign-in': {
        readonly paths: readonly ["M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"];
    };
    readonly 'sign-out': {
        readonly paths: readonly ["M15 17l5-5-5-5M20 12H9M12 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"];
    };
    readonly 'message-plus': {
        readonly paths: readonly ["M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z", "M12 8.5v7M8.5 12h7"];
        readonly strokeWidth: 2.2;
    };
    readonly pin: {
        readonly paths: readonly ["M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z", "M14.5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"];
    };
    readonly alert: {
        readonly paths: readonly ["M12 9v4M12 17h.01", "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"];
    };
    readonly more: {
        readonly paths: readonly ["M5 12h.01M12 12h.01M19 12h.01"];
        readonly strokeWidth: 3;
    };
    readonly menu: {
        readonly paths: readonly ["M4 6h16M4 12h16M4 18h16"];
    };
    readonly copy: {
        readonly paths: readonly ["M9 9h11v11H9z", "M5 15H4V4h11v1"];
    };
    readonly external: {
        readonly paths: readonly ["M14 4h6v6", "M20 4 10 14", "M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"];
    };
    readonly edit: {
        readonly paths: readonly ["M4 20h4L19 9l-4-4L4 16v4z", "M13.5 6.5l4 4"];
    };
    readonly download: {
        readonly paths: readonly ["M12 4v11", "M7 10l5 5 5-5", "M5 20h14"];
    };
    readonly upload: {
        readonly paths: readonly ["M12 20V9", "M7 14l5-5 5 5", "M5 4h14"];
    };
    readonly filter: {
        readonly paths: readonly ["M4 5h16l-6 7.5V19l-4 1v-7.5L4 5z"];
    };
    readonly info: {
        readonly paths: readonly ["M12 11v5M12 8h.01", "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"];
    };
    readonly home: {
        readonly paths: readonly ["M4 11l8-7 8 7", "M6 9.5V20h12V9.5"];
    };
    readonly users: {
        readonly paths: readonly ["M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20", "M13 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z", "M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35", "M15.5 5.15a3 3 0 0 1 0 5.7"];
    };
    readonly user: {
        readonly paths: readonly ["M19 20v-1.5A3.5 3.5 0 0 0 15.5 15h-7A3.5 3.5 0 0 0 5 18.5V20", "M15.5 8a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"];
    };
    readonly settings: {
        readonly paths: readonly ["M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z", "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"];
    };
    readonly chart: {
        readonly paths: readonly ["M4 20V4", "M4 20h16", "M8 16v-4M12 16V8M16 16v-6"];
    };
    readonly table: {
        readonly paths: readonly ["M4 5h16v14H4z", "M4 10h16M4 15h16M10 5v14"];
    };
    readonly map: {
        readonly paths: readonly ["M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z", "M9 4v14M15 6v14"];
    };
    readonly bell: {
        readonly paths: readonly ["M6 16V11a6 6 0 1 1 12 0v5l2 2H4l2-2z", "M10 20a2 2 0 0 0 4 0"];
    };
    readonly key: {
        readonly paths: readonly ["M14.5 9.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z", "M13 13l7 7M17 17l2-2"];
    };
    readonly calendar: {
        readonly paths: readonly ["M4 6h16v14H4z", "M4 10h16M8 3v4M16 3v4"];
    };
    readonly eye: {
        readonly paths: readonly ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"];
    };
    readonly lock: {
        readonly paths: readonly ["M6 11h12v9H6z", "M8.5 11V8a3.5 3.5 0 0 1 7 0v3"];
    };
    readonly swap: {
        readonly paths: readonly ["M7 4 3 8l4 4", "M3 8h14", "M17 20l4-4-4-4", "M21 16H7"];
    };
    readonly play: {
        readonly fill: true;
        readonly paths: readonly ["M8 5v14l11-7z"];
    };
    readonly pause: {
        readonly fill: true;
        readonly paths: readonly ["M7 5h3v14H7zM14 5h3v14h-3z"];
    };
    readonly send: {
        readonly paths: readonly ["M4 12 20 4l-4 16-4-7-8-1z", "M12 13l8-9"];
    };
    readonly file: {
        readonly paths: readonly ["M6 3h8l4 4v14H6z", "M14 3v4h4"];
    };
    readonly 'arrow-left': {
        readonly paths: readonly ["M19 12H5", "M11 6l-6 6 6 6"];
    };
    readonly 'thumbs-up': {
        readonly fill: true;
        readonly paths: readonly ["M7 10v11H3V10h4zm2 11h8.3a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 18.7 10H14V5.5A2.5 2.5 0 0 0 11.5 3L9 10v11z"];
    };
    readonly 'thumbs-down': {
        readonly fill: true;
        readonly paths: readonly ["M17 14V3h4v11h-4zm-2-11H6.7a2 2 0 0 0-2 1.6l-1.4 7A2 2 0 0 0 5.3 14H10v4.5a2.5 2.5 0 0 0 2.5 2.5L15 14V3z"];
    };
    readonly minus: {
        readonly paths: readonly ["M5 12h14"];
        readonly strokeWidth: 2.2;
    };
    readonly 'chevron-up': {
        readonly paths: readonly ["M6 15l6-6 6 6"];
    };
    readonly 'arrow-right': {
        readonly paths: readonly ["M5 12h14M13 6l6 6-6 6"];
    };
    readonly 'arrow-up': {
        readonly paths: readonly ["M12 19V5M6 11l6-6 6 6"];
    };
    readonly 'arrow-down': {
        readonly paths: readonly ["M12 5v14M6 13l6 6 6-6"];
    };
    readonly 'more-vertical': {
        readonly paths: readonly ["M12 5h.01M12 12h.01M12 19h.01"];
        readonly strokeWidth: 3;
    };
    readonly grid: {
        readonly paths: readonly ["M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"];
    };
    readonly list: {
        readonly paths: readonly ["M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"];
    };
    readonly sidebar: {
        readonly paths: readonly ["M4 5h16v14H4z", "M9 5v14"];
    };
    readonly star: {
        readonly paths: readonly ["M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z"];
    };
    readonly heart: {
        readonly paths: readonly ["M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"];
    };
    readonly share: {
        readonly paths: readonly ["M12 4v11M8 8l4-4 4 4", "M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"];
    };
    readonly link: {
        readonly paths: readonly ["M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1", "M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"];
    };
    readonly globe: {
        readonly paths: readonly ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M3 12h18", "M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"];
    };
    readonly sun: {
        readonly paths: readonly ["M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"];
    };
    readonly moon: {
        readonly paths: readonly ["M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"];
    };
    readonly clock: {
        readonly paths: readonly ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7v5l3 2"];
    };
    readonly tag: {
        readonly paths: readonly ["M3.5 12.5V4h8.5l8.5 8.5-8.5 8.5z", "M8 8h.01"];
    };
    readonly bookmark: {
        readonly paths: readonly ["M6 4h12v17l-6-4-6 4z"];
    };
    readonly flag: {
        readonly paths: readonly ["M5 21V4M5 4h11l-2 4 2 4H5"];
    };
    readonly bolt: {
        readonly paths: readonly ["M13 2 4 14h7l-1 8 9-12h-7z"];
    };
    readonly sparkles: {
        readonly paths: readonly ["M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z", "M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"];
    };
    readonly palette: {
        readonly paths: readonly ["M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3.2 3H16a2 2 0 0 0-1.4 3.4A1.6 1.6 0 0 1 12 21z", "M7.5 11h.01M10 7h.01M14.5 7h.01M17 11h.01"];
        readonly strokeWidth: 2;
    };
    readonly image: {
        readonly paths: readonly ["M4 5h16v14H4z", "M4 16l5-5 4 4 2-2 5 5", "M15.5 9.5h.01"];
    };
    readonly camera: {
        readonly paths: readonly ["M4 8h3l2-3h6l2 3h3v11H4z", "M12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"];
    };
    readonly mic: {
        readonly paths: readonly ["M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z", "M5 11a7 7 0 0 0 14 0M12 18v3"];
    };
    readonly phone: {
        readonly paths: readonly ["M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"];
    };
    readonly mail: {
        readonly paths: readonly ["M3.5 6h17v12h-17z", "m4 7 8 6 8-6"];
    };
    readonly inbox: {
        readonly paths: readonly ["M4 13l2.5-8h11l2.5 8v6H4z", "M4 13h5l1 2h4l1-2h5"];
    };
    readonly chat: {
        readonly paths: readonly ["M5 5h14v10H10l-5 4z"];
    };
    readonly folder: {
        readonly paths: readonly ["M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z"];
    };
    readonly 'file-text': {
        readonly paths: readonly ["M6 3h8l4 4v14H6z", "M14 3v4h4", "M9 12h6M9 16h6"];
    };
    readonly code: {
        readonly paths: readonly ["M8 7l-5 5 5 5M16 7l5 5-5 5"];
    };
    readonly terminal: {
        readonly paths: readonly ["M4 5h16v14H4z", "M8 10l2 2-2 2M12 14h4"];
    };
    readonly database: {
        readonly paths: readonly ["M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3z", "M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5", "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"];
    };
    readonly layers: {
        readonly paths: readonly ["M12 3 3 8l9 5 9-5z", "M3 13l9 5 9-5"];
    };
    readonly layout: {
        readonly paths: readonly ["M4 4h16v16H4z", "M4 9h16M10 9v11"];
    };
    readonly window: {
        readonly paths: readonly ["M3.5 5h17v14h-17z", "M3.5 9h17", "M6.5 7h.01M9 7h.01"];
    };
    readonly monitor: {
        readonly paths: readonly ["M3 4h18v12H3z", "M8 20h8M12 16v4"];
    };
    readonly tablet: {
        readonly paths: readonly ["M6 3h12v18H6z", "M11 18h2"];
    };
    readonly cart: {
        readonly paths: readonly ["M3 4h2.5l2.2 11h10.6L20.5 8H6.6", "M9 20h.01M17 20h.01"];
        readonly strokeWidth: 2.2;
    };
    readonly bag: {
        readonly paths: readonly ["M5 8h14l-1 13H6z", "M9 8V6a3 3 0 0 1 6 0v2"];
    };
    readonly 'credit-card': {
        readonly paths: readonly ["M3 6h18v12H3z", "M3 10h18M7 15h4"];
    };
    readonly gift: {
        readonly paths: readonly ["M4 10h16v10H4zM3 7h18v3H3z", "M12 7v13", "M12 7S10.5 3 8 4s0 3 4 3zM12 7s1.5-4 4-3 0 3-4 3z"];
    };
    readonly truck: {
        readonly paths: readonly ["M3 6h11v10H3zM14 9h4l3 3v4h-7", "M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"];
    };
    readonly percent: {
        readonly paths: readonly ["M19 5 5 19", "M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"];
    };
    readonly wifi: {
        readonly paths: readonly ["M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0", "M12 19.5h.01"];
        readonly strokeWidth: 2.2;
    };
    readonly battery: {
        readonly paths: readonly ["M3 8h15v8H3z", "M21 11v2", "M5.5 10.5h8v3h-8z"];
    };
    readonly bluetooth: {
        readonly paths: readonly ["M7 7l10 10-5 4V3l5 4L7 17"];
    };
    readonly volume: {
        readonly paths: readonly ["M4 9h4l5-4v14l-5-4H4z", "M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"];
    };
    readonly power: {
        readonly paths: readonly ["M12 3v9", "M6.3 6.3a8 8 0 1 0 11.4 0"];
    };
    readonly maximize: {
        readonly paths: readonly ["M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"];
    };
    readonly minimize: {
        readonly paths: readonly ["M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"];
    };
    readonly command: {
        readonly paths: readonly ["M9 9V6.5A2.5 2.5 0 1 0 6.5 9H9zm0 0h6m-6 0v6m6-6V6.5A2.5 2.5 0 1 1 17.5 9H15zm0 0v6m0 0h2.5a2.5 2.5 0 1 1-2.5 2.5V15zm0 0H9m0 0v2.5A2.5 2.5 0 1 1 6.5 15H9z"];
        readonly strokeWidth: 1.8;
    };
    readonly activity: {
        readonly paths: readonly ["M3 12h4l3-8 4 16 3-8h4"];
    };
    readonly 'check-circle': {
        readonly paths: readonly ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "m8 12.5 2.8 2.8L16.5 9.5"];
    };
    readonly 'x-circle': {
        readonly paths: readonly ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M9 9l6 6M15 9l-6 6"];
    };
    readonly help: {
        readonly paths: readonly ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"];
    };
    readonly 'user-plus': {
        readonly paths: readonly ["M10 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M3 20a7 7 0 0 1 12.5-4.3", "M19 14v6M16 17h6"];
    };
    readonly 'at-sign': {
        readonly paths: readonly ["M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1"];
    };
    readonly kanban: {
        readonly paths: readonly ["M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v6h-4z"];
    };
    readonly 'check-square': {
        readonly paths: readonly ["M4 4h16v16H4z", "m8 12 3 3 5-6"];
    };
    readonly pencil: {
        readonly paths: readonly ["M4 20h4L19 9l-4-4L4 16z", "M13.5 6.5l4 4"];
    };
    readonly rocket: {
        readonly paths: readonly ["M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2", "M9 15l-3-3c1.5-4 5-8.5 12-9 0 7-5 10.5-9 12z", "M15 9h.01"];
    };
    readonly cloud: {
        readonly paths: readonly ["M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5z"];
    };
    readonly music: {
        readonly paths: readonly ["M9 18V5l11-2v13", "M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z", "M20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"];
    };
    readonly video: {
        readonly paths: readonly ["M3 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "m16 10 5-3v10l-5-3"];
    };
    readonly book: {
        readonly paths: readonly ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z", "M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"];
    };
    readonly briefcase: {
        readonly paths: readonly ["M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M8 6V4h8v2", "M3 13h18"];
    };
    readonly compass: {
        readonly paths: readonly ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", "m15.5 8.5-2 5-5 2 2-5z"];
    };
    readonly 'trending-up': {
        readonly paths: readonly ["M3 17l6-6 4 4 8-8", "M15 7h6v6"];
    };
    readonly 'trending-down': {
        readonly paths: readonly ["M3 7l6 6 4-4 8 8", "M15 17h6v-6"];
    };
    readonly package: {
        readonly paths: readonly ["M21 8 12 3 3 8v8l9 5 9-5z", "M3 8l9 5 9-5", "M12 13v8"];
    };
    readonly store: {
        readonly paths: readonly ["M4 10v10h16V10", "M3 10l2-6h14l2 6", "M3 10a3 3 0 0 0 6 0a3 3 0 0 0 6 0a3 3 0 0 0 6 0", "M10 20v-5h4v5"];
    };
    readonly weather: {
        readonly paths: readonly ["M12 3v2M5.6 5.6l1.4 1.4M3 12h2M17 7l1.4-1.4", "M8 12a4 4 0 0 1 7.7-1.5", "M9 20a3 3 0 0 1-.5-6 5 5 0 0 1 9.5 1 2.5 2.5 0 0 1 0 5z"];
    };
    readonly bold: {
        readonly paths: readonly ["M7 5h6a3.5 3.5 0 0 1 0 7H7z", "M7 12h7a3.5 3.5 0 0 1 0 7H7z"];
        readonly strokeWidth: 2.4;
    };
    readonly italic: {
        readonly paths: readonly ["M10 5h8M6 19h8M14 5l-4 14"];
    };
    readonly underline: {
        readonly paths: readonly ["M7 4v7a5 5 0 0 0 10 0V4", "M5 20h14"];
    };
    readonly strikethrough: {
        readonly paths: readonly ["M4 12h16", "M16.5 7.5C16 5.6 14.2 4.5 12 4.5c-2.6 0-4.5 1.4-4.5 3.5", "M8 16c.4 2.1 2.3 3.5 4.5 3.5 2.6 0 4.5-1.4 4.5-3.5"];
    };
    readonly 'align-left': {
        readonly paths: readonly ["M4 6h16M4 10h10M4 14h16M4 18h10"];
    };
    readonly 'align-center': {
        readonly paths: readonly ["M4 6h16M7 10h10M4 14h16M7 18h10"];
    };
    readonly 'align-right': {
        readonly paths: readonly ["M4 6h16M10 10h10M4 14h16M10 18h10"];
    };
    readonly 'list-ordered': {
        readonly paths: readonly ["M10 6h10M10 12h10M10 18h10", "M4 5l1.5-1v5", "M3.5 14.2c.4-.8 2.5-1 2.5.4 0 1-2.5 2-2.5 3.4h2.6"];
    };
    readonly quote: {
        readonly paths: readonly ["M6 17c-1.5 0-2.5-1.2-2.5-3 0-3 1.8-5.5 4.5-7", "M15 17c-1.5 0-2.5-1.2-2.5-3 0-3 1.8-5.5 4.5-7", "M3.6 13.5a2.6 2.6 0 1 0 2.4-2.5", "M12.6 13.5a2.6 2.6 0 1 0 2.4-2.5"];
    };
    readonly undo: {
        readonly paths: readonly ["M9 14 4 9l5-5", "M4 9h10.5a5.5 5.5 0 0 1 0 11H11"];
    };
    readonly redo: {
        readonly paths: readonly ["m15 14 5-5-5-5", "M20 9H9.5a5.5 5.5 0 0 0 0 11H13"];
    };
    readonly sigma: {
        readonly paths: readonly ["M18 7V4H6l6 8-6 8h12v-3"];
    };
    readonly presentation: {
        readonly paths: readonly ["M3 4h18", "M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4", "M12 16v4M8 21l4-1 4 1"];
    };
    readonly type: {
        readonly paths: readonly ["M4 7V5h16v2", "M12 5v14", "M9 19h6"];
    };
    readonly square: {
        readonly paths: readonly ["M5 5h14v14H5z"];
    };
    readonly circle: {
        readonly paths: readonly ["M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"];
    };
    /** Six dots: "you can pick this up and move it" (drag handles). */
    readonly grip: {
        readonly paths: readonly ["M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"];
        readonly strokeWidth: 3;
    };
    readonly 'heading-1': {
        readonly paths: readonly ["M3.5 6v12M11.5 6v12M3.5 12h8", "M16 10.5l3-2.5v10"];
    };
    readonly 'heading-2': {
        readonly paths: readonly ["M3.5 6v12M11.5 6v12M3.5 12h8", "M15.5 10.5c0-1.5 1.1-2.5 2.5-2.5s2.5 1 2.5 2.4c0 1.1-.6 1.9-1.5 2.8L15.5 18h5"];
    };
    readonly 'heading-3': {
        readonly paths: readonly ["M3.5 6v12M11.5 6v12M3.5 12h8", "M15.5 8h5l-2.8 3.4c1.7-.2 3 .9 3 2.7 0 1.8-1.4 3-3.1 3-1.1 0-2-.5-2.5-1.3"];
    };
    readonly shield: {
        readonly paths: readonly ["M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z", "m9 12 2 2 4-4"];
    };
    readonly headphones: {
        readonly paths: readonly ["M4 16v-4a8 8 0 0 1 16 0v4", "M4 15h3v6H6a2 2 0 0 1-2-2v-4z", "M20 15h-3v6h1a2 2 0 0 0 2-2v-4z"];
    };
    readonly cpu: {
        readonly paths: readonly ["M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z", "M10 10h4v4h-4z", "M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"];
    };
    readonly bike: {
        readonly paths: readonly ["M9 17.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z", "M22 17.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z", "M5.5 17.5 9 10h6.5l3 7.5", "M9 10l3.5 7.5", "M14 6h2.5l-1 4"];
    };
    readonly gamepad: {
        readonly paths: readonly ["M7 8h10a4 4 0 0 1 4 4v1.5a3.5 3.5 0 0 1-6.3 2.1L14 15h-4l-.7.6A3.5 3.5 0 0 1 3 13.5V12a4 4 0 0 1 4-4z", "M7.5 10.5v3M6 12h3", "M15.5 11.5h.01M17.5 13h.01"];
    };
    readonly waveform: {
        readonly paths: readonly ["M3 11v2M7 8v8M11 4v16M15 7v10M19 10v4"];
    };
    readonly mountain: {
        readonly paths: readonly ["M3 19 9 9l4 6 2-3 6 7H3z"];
    };
    readonly droplet: {
        readonly paths: readonly ["M12 3.5c3.2 4 5.5 7.1 5.5 10a5.5 5.5 0 0 1-11 0c0-2.9 2.3-6 5.5-10z"];
    };
    readonly wind: {
        readonly paths: readonly ["M3 9h11a3 3 0 1 0-3-3", "M3 13h15a3 3 0 1 1-3 3", "M3 17h7"];
    };
    readonly thermometer: {
        readonly paths: readonly ["M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z", "M12 9v6.5"];
    };
    readonly leaf: {
        readonly paths: readonly ["M5 19c0-8 5-14 15-14 0 10-6 15-14 15", "M5 19c3-4 6-6.5 10-8.5"];
    };
    readonly 'git-branch': {
        readonly paths: readonly ["M6 4v11", "M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 9c0 5-6 4-12 7"];
    };
    readonly 'git-merge': {
        readonly paths: readonly ["M6 21V8", "M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M6 8c0 6 5 9 12 9"];
    };
    readonly 'git-commit': {
        readonly paths: readonly ["M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z", "M3 12h6M15 12h6"];
    };
    readonly bug: {
        readonly paths: readonly ["M8 9a4 4 0 0 1 8 0v5a4 4 0 0 1-8 0V9z", "M12 9v9", "M4 10l4 1M20 10l-4 1M4 18l4-2M20 18l-4-2M9 5l-1.5-2M15 5l1.5-2"];
    };
    readonly server: {
        readonly paths: readonly ["M4 4h16v6H4zM4 14h16v6H4z", "M8 7h.01M8 17h.01"];
    };
    readonly wallet: {
        readonly paths: readonly ["M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V7z", "M4 7l11-3v3", "M16 13.5h.01"];
    };
    readonly receipt: {
        readonly paths: readonly ["M6 3h12v18l-3-2-3 2-3-2-3 2V3z", "M9 8h6M9 12h6M9 16h3"];
    };
    readonly utensils: {
        readonly paths: readonly ["M7 3v18", "M4 3v5a3 3 0 0 0 6 0V3", "M17 21V3c-2 1-3 4-3 7h3"];
    };
    readonly dumbbell: {
        readonly paths: readonly ["M3 10v4M6 7v10M18 7v10M21 10v4", "M6 12h12"];
    };
    readonly trophy: {
        readonly paths: readonly ["M8 4h8v5a4 4 0 0 1-8 0V4z", "M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4", "M12 13v4M9 20h6M10 17h4"];
    };
    readonly flame: {
        readonly paths: readonly ["M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"];
    };
    readonly repeat: {
        readonly paths: readonly ["M17 3l3 3-3 3", "M4 11V9a3 3 0 0 1 3-3h13", "M7 21l-3-3 3-3", "M20 13v2a3 3 0 0 1-3 3H4"];
    };
    readonly shuffle: {
        readonly paths: readonly ["M17 4l3 3-3 3M17 14l3 3-3 3", "M4 7h3c5 0 5 10 10 10h3", "M4 17h3c1.5 0 2.5-.8 3.3-2M13.7 9c.8-1.2 1.8-2 3.3-2h3"];
    };
    readonly 'skip-forward': {
        readonly paths: readonly ["M5 5l10 7-10 7V5z", "M19 5v14"];
    };
    readonly 'skip-back': {
        readonly paths: readonly ["M19 5L9 12l10 7V5z", "M5 5v14"];
    };
    readonly target: {
        readonly paths: readonly ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z", "M12 12h.01"];
    };
    readonly coins: {
        readonly paths: readonly ["M3 7a6 3 0 1 0 12 0a6 3 0 1 0-12 0", "M3 7v4c0 1.66 2.69 3 6 3", "M9 13a6 3 0 1 0 12 0a6 3 0 1 0-12 0", "M9 13v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4"];
    };
    readonly ship: {
        readonly paths: readonly ["M3 15h18l-2.5 4.5a2 2 0 0 1-1.75 1H7.25a2 2 0 0 1-1.75-1L3 15z", "M6 15V9h12v6", "M10 9V5h4v4"];
    };
    readonly anchor: {
        readonly paths: readonly ["M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M12 8v13", "M5 13a7 7 0 0 0 14 0", "M9 11h6"];
    };
    readonly ticket: {
        readonly paths: readonly ["M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V7z", "M14 7v10"];
    };
};
export type IconName = keyof typeof icons;
export declare const iconNames: IconName[];
