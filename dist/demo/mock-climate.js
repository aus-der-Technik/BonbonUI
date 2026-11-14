export const devices = [
    { id: 'mist', label: 'Misting', icon: 'droplet' },
    { id: 'vents', label: 'Vents', icon: 'wind' },
    { id: 'light', label: 'Grow light', icon: 'sun' },
    { id: 'heat', label: 'Heating', icon: 'thermometer' },
    { id: 'night', label: 'Night', icon: 'moon' },
];
export const railItems = [
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar' },
    { id: 'sensors', label: 'Sensors', icon: 'activity' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
];
/** A smooth day curve: lower around noon (warm, dry air), higher at night. */
function day(base, swing, phase = 0) {
    return Array.from({ length: 24 }, (_, h) => ({
        label: `${String(h).padStart(2, '0')}:00`,
        value: h > 14
            ? null
            : Math.round((base - swing * Math.cos(((h - 13 + phase) / 24) * Math.PI * 2)) * 10) / 10,
    }));
}
export const zones = [
    {
        id: 'seedlings',
        name: 'Seedlings',
        air: 22.6,
        target: 23.5,
        humidity: 71,
        soil: 46,
        light: 18.4,
        sensors: { online: 11, total: 12 },
        devices: { mist: true, vents: false, light: true, heat: true, night: false },
        day: day(74, 6),
        lastMist: '12:40',
    },
    {
        id: 'herbs',
        name: 'Herbs',
        air: 24.8,
        target: 22,
        humidity: 54,
        soil: 33,
        light: 26.1,
        sensors: { online: 8, total: 8 },
        devices: { mist: false, vents: true, light: true, heat: false, night: false },
        day: day(58, 5, 2),
        lastMist: '09:15',
    },
    {
        id: 'tomatoes',
        name: 'Tomatoes',
        air: 25.3,
        target: 25,
        humidity: 63,
        soil: 52,
        light: 31.7,
        sensors: { online: 14, total: 14 },
        devices: { mist: true, vents: true, light: false, heat: false, night: false },
        day: day(66, 7, -1),
        lastMist: '11:50',
    },
    {
        id: 'orchids',
        name: 'Orchids',
        air: 21.4,
        target: 21.5,
        humidity: 78,
        soil: 41,
        light: 9.8,
        sensors: { online: 5, total: 6 },
        devices: { mist: true, vents: false, light: false, heat: true, night: true },
        day: day(80, 4, 3),
        lastMist: '13:05',
    },
];
