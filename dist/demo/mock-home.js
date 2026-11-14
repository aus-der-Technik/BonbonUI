export const PHOTO = { w: 1920, h: 1080 };
export const places = [
    { id: 'solar', name: 'Solar roof', kind: 'Roof', anchor: { x: 1300, y: 432 }, reach: 'centre' },
    { id: 'door', name: 'Front door', kind: 'Entrance', anchor: { x: 958, y: 548 }, reach: 'left' },
    {
        id: 'hall',
        name: 'Main hall',
        kind: 'Room · ground floor',
        anchor: { x: 1250, y: 560 },
        reach: 'right',
    },
];
export const devices = [
    { id: 'lamp', name: 'Ceiling lamp', icon: 'sun', place: 'hall', on: true, level: 70, watts: 60 },
    {
        id: 'strip',
        name: 'Light strip',
        icon: 'sparkles',
        place: 'hall',
        on: true,
        level: 45,
        watts: 24,
    },
    { id: 'speaker', name: 'Speaker', icon: 'volume', place: 'hall', on: true, level: 30, watts: 12 },
    {
        id: 'vacuum',
        name: 'Robot vacuum',
        icon: 'target',
        place: 'hall',
        on: false,
        watts: 45,
        onText: 'Cleaning',
        offText: 'Docked',
    },
    {
        id: 'grid',
        name: 'Feed surplus to grid',
        icon: 'arrow-up',
        place: 'solar',
        on: true,
        watts: 0,
    },
    {
        id: 'battery',
        name: 'Charge battery first',
        icon: 'battery',
        place: 'solar',
        on: true,
        watts: 0,
    },
    { id: 'car', name: 'Car charger', icon: 'bolt', place: 'solar', on: false, watts: 7400 },
    {
        id: 'lock',
        name: 'Door lock',
        icon: 'lock',
        place: 'door',
        on: true,
        watts: 0,
        onText: 'Locked',
        offText: 'Unlocked',
    },
    { id: 'porch', name: 'Porch light', icon: 'sun', place: 'door', on: false, watts: 15 },
    { id: 'chime', name: 'Doorbell chime', icon: 'bell', place: 'door', on: true, watts: 0 },
    { id: 'camera', name: 'Entrance camera', icon: 'camera', place: 'door', on: true, watts: 4 },
];
/** The three devices on the dashboard itself. */
export const favourites = ['lamp', 'strip', 'speaker'];
/** Soft light colours for the light strip: palette tokens mixed with white, never neon. */
export const stripColours = [
    { id: 'warm', name: 'Warm white', css: 'color-mix(in oklab, var(--color-yellow) 28%, white)' },
    { id: 'amber', name: 'Amber', css: 'color-mix(in oklab, var(--color-orange) 62%, white)' },
    { id: 'rose', name: 'Rose', css: 'color-mix(in oklab, var(--color-pink) 48%, white)' },
    { id: 'sky', name: 'Sky', css: 'color-mix(in oklab, var(--color-cyan) 55%, white)' },
];
export const modes = [
    { id: 'auto', label: 'Auto', icon: 'repeat', says: 'Heats or cools as needed' },
    { id: 'cool', label: 'Cool', icon: 'wind', says: 'Cools only, never heats' },
    { id: 'warm', label: 'Warm', icon: 'flame', says: 'Heats only, never cools' },
    { id: 'eco', label: 'Eco', icon: 'leaf', says: 'Looser by 2°, about 15 % less' },
];
export const railItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'rooms', label: 'Rooms', icon: 'layout' },
    { id: 'energy', label: 'Energy', icon: 'bolt' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
];
/** Use per hour today, kWh; the hours still to come are null. */
export const energyToday = [
    0.5,
    0.44,
    0.41,
    0.39,
    0.42,
    0.53,
    0.91,
    1.44,
    1.27,
    0.97,
    0.86,
    0.94,
    1.16,
    1.06,
    1.11,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];
export const energyYesterday = 13.5;
/** What the house draws with every device off: fridge, network, heat pump idling. kW. */
export const baseLoad = 0.62;
export const solarNow = 3.8;
export const solarToday = 14.2;
export const batteryCharge = 82;
