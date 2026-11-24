/** Mock data for the greenhouse climate controller example (Pages/Devices). */
import type { IconName } from '../patterns/atoms/icons';
import type { LinePoint } from '../patterns/organisms/LineChart.svelte';
export type DeviceId = 'mist' | 'vents' | 'light' | 'heat' | 'night';
export interface Zone {
    id: string;
    name: string;
    /** Air temperature now, °C. */
    air: number;
    /** What the heating and the vents steer towards, °C. */
    target: number;
    humidity: number;
    soil: number;
    /** Light, kilolux. */
    light: number;
    sensors: {
        online: number;
        total: number;
    };
    devices: Record<DeviceId, boolean>;
    /** Humidity over today, one point per hour. */
    day: LinePoint[];
    lastMist: string;
}
export declare const devices: {
    id: DeviceId;
    label: string;
    icon: IconName;
}[];
export declare const railItems: {
    id: string;
    label: string;
    icon: IconName;
}[];
export declare const zones: Zone[];
