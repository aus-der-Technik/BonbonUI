/** Mock data for the listening-room example (Pages/Fun). Every artist and title is invented. */
import type { PaletteColor } from '../patterns/atoms/palette';

/** Album art is drawn with CSS gradients from palette tokens, no images. */
export interface AlbumArt {
  from: PaletteColor;
  to: PaletteColor;
  /** The colour of the motif laid over the background. */
  spot: PaletteColor;
  motif: 'sun' | 'rings' | 'stripes' | 'split' | 'dots';
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumId: string;
  /** Length in seconds. */
  seconds: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  /** Lower is newer — the order of "Recently added". */
  added: number;
  art: AlbumArt;
  tracks: Track[];
}

function album(
  id: string,
  title: string,
  artist: string,
  year: number,
  added: number,
  art: AlbumArt,
  tracks: [string, number][],
): Album {
  return {
    id,
    title,
    artist,
    year,
    added,
    art,
    tracks: tracks.map(([name, seconds], i) => ({
      id: `${id}-${i + 1}`,
      title: name,
      artist,
      albumId: id,
      seconds,
    })),
  };
}

export const albums: Album[] = [
  album(
    'quiet-hours',
    'Quiet Hours',
    'The Example Quartet',
    2024,
    0,
    { from: 'indigo', to: 'pink', spot: 'yellow', motif: 'sun' },
    [
      ['Lamplight, Slowly', 254],
      ['Five Past Nine', 212],
      ['A Kettle on the Stove', 238],
      ['Window Seat', 197],
      ['The Long Way Home', 301],
    ],
  ),
  album(
    'small-weather',
    'Small Weather',
    'Mira Example',
    2023,
    1,
    { from: 'cyan', to: 'blue', spot: 'mint', motif: 'rings' },
    [
      ['Drizzle Waltz', 186],
      ['Barometer', 224],
      ['Clearing Up', 205],
      ['Umbrella Song', 173],
    ],
  ),
  album(
    'night-tram',
    'Night Tram',
    'Studio Sample Ensemble',
    2022,
    2,
    { from: 'purple', to: 'indigo', spot: 'orange', motif: 'stripes' },
    [
      ['Last Departure', 266],
      ['Overhead Wires', 241],
      ['Terminus', 288],
      ['Sleeping Stops', 219],
    ],
  ),
  album(
    'glass-garden',
    'Glass Garden',
    'The Example Quartet',
    2021,
    3,
    { from: 'mint', to: 'green', spot: 'yellow', motif: 'dots' },
    [
      ['Greenhouse Morning', 232],
      ['Fern Study', 199],
      ['Condensation', 247],
      ['Watering Can', 181],
    ],
  ),
  album(
    'paper-moons',
    'Paper Moons',
    'Lio Example & Friends',
    2024,
    4,
    { from: 'orange', to: 'pink', spot: 'purple', motif: 'split' },
    [
      ['Cut-Out Sky', 208],
      ['Folding Song', 192],
      ['Scissors and Glue', 226],
    ],
  ),
  album(
    'slow-rivers',
    'Slow Rivers',
    'Northwind Example Trio',
    2020,
    5,
    { from: 'teal', to: 'indigo', spot: 'cyan', motif: 'rings' },
    [
      ['Upstream', 315],
      ['Ferry Bell', 244],
      ['Delta', 279],
      ['Stones', 203],
    ],
  ),
  album(
    'blue-kitchen',
    'Blue Kitchen',
    'Mira Example',
    2019,
    6,
    { from: 'blue', to: 'purple', spot: 'pink', motif: 'sun' },
    [
      ['Toast Is Ready', 168],
      ['Saucepan Swing', 201],
      ['Washing Up', 230],
    ],
  ),
  album(
    'morning-lines',
    'Morning Lines',
    'Example Brass Band',
    2023,
    7,
    { from: 'yellow', to: 'orange', spot: 'red', motif: 'stripes' },
    [
      ['Bus Stop Fanfare', 177],
      ['Crossing', 214],
      ['Platform Two', 196],
      ['Rush Hour Hymn', 258],
    ],
  ),
];

export const albumById = (id: string): Album => albums.find((a) => a.id === id) ?? albums[0]!;

/** Heights (0–1) and speeds of the visualiser's bars; fixed, so it looks the same every run. */
export const bars = [
  0.55, 0.8, 0.4, 0.95, 0.65, 0.3, 0.75, 0.5, 0.9, 0.35, 0.7, 0.6, 0.85, 0.45, 0.6, 0.3,
].map((h, i) => ({ h, delay: -((i * 137) % 900), speed: 620 + ((i * 211) % 520) }));
