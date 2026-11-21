/** Mock data for the smart-home dashboard example (Pages/Devices). */
import type { IconName } from '../patterns/atoms/icons';
export type PlaceId = 'hall' | 'solar' | 'door';
export type ClimateMode = 'auto' | 'cool' | 'warm' | 'eco';
export type StripColour = 'warm' | 'amber' | 'rose' | 'sky';
export interface HomeDevice {
    id: string;
    name: string;
    icon: IconName;
    place: PlaceId;
    on: boolean;
    /** Brightness or volume, 0–100, for devices that have one. */
    level?: number;
    /** Power drawn while on, in watts. */
    watts: number;
    /** What the device says when it is on and off (e.g. "Locked" / "Unlocked"). */
    onText?: string;
    offText?: string;
}
export interface Place {
    id: PlaceId;
    name: string;
    /** The eyebrow over the name in the side panel. */
    kind: string;
    /**
     * Where the hotspot sits in the bundled backdrop photo, in its pixels (1920 × 1080). Another
     * photo gets the hotspots as a row instead.
     */
    anchor: {
        x: number;
        y: number;
    };
    /** Which way the pill reaches from its pin, so neighbouring pills do not overlap. */
    reach: 'left' | 'right' | 'centre';
}
export declare const PHOTO: {
    w: number;
    h: number;
};
export declare const places: Place[];
export declare const devices: HomeDevice[];
/** The three devices on the dashboard itself. */
export declare const favourites: readonly ["lamp", "strip", "speaker"];
/** Soft light colours for the light strip: palette tokens mixed with white, never neon. */
export declare const stripColours: {
    id: StripColour;
    name: string;
    css: string;
}[];
export declare const modes: {
    id: ClimateMode;
    label: string;
    icon: IconName;
    says: string;
}[];
export declare const railItems: {
    id: string;
    label: string;
    icon: IconName;
}[];
/** Use per hour today, kWh; the hours still to come are null. */
export declare const energyToday: (number | null)[];
export declare const energyYesterday = 13.5;
/** What the house draws with every device off: fridge, network, heat pump idling. kW. */
export declare const baseLoad = 0.62;
export declare const solarNow = 3.8;
export declare const solarToday = 14.2;
export declare const batteryCharge = 82;
