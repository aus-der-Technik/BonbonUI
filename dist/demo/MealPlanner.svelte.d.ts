interface Props {
    /** Opens with a cooking timer running in tonight's recipe. */
    cooking?: boolean;
    /** Opens on next week, with nothing planned yet. */
    emptyWeek?: boolean;
}
declare const MealPlanner: import("svelte").Component<Props, {}, "">;
type MealPlanner = ReturnType<typeof MealPlanner>;
export default MealPlanner;
