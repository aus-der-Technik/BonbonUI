interface Props {
    /** Opens with the new-expense row already open at the top of the list. */
    adding?: boolean;
    /** Opens with the two already square (the balance settled). */
    settled?: boolean;
}
declare const HouseholdBudget: import("svelte").Component<Props, {}, "">;
type HouseholdBudget = ReturnType<typeof HouseholdBudget>;
export default HouseholdBudget;
