export type Scene = 'buttons' | 'soft-keys' | 'rail' | 'gauge' | 'gauge-photo' | 'dot-matrix' | 'switches' | 'segmented' | 'kpis' | 'chart' | 'player' | 'glass-bar';
interface Props {
    scene: Scene;
}
declare const MarketingStudio: import("svelte").Component<Props, {}, "">;
type MarketingStudio = ReturnType<typeof MarketingStudio>;
export default MarketingStudio;
