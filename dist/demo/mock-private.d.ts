/** Mock data for the private, home-use example pages (Pages/Private): a household budget, a
 *  meal planner and a training log. Dates are fixed so the pages read the same every day. */
import type { IconName } from '../patterns/atoms/icons';
import type { LinePoint } from '../patterns/organisms/LineChart.svelte';
export type PersonId = 'robin' | 'sam';
export declare const people: Record<PersonId, {
    name: string;
    short: string;
    email: string;
}>;
/** The money period runs from one payday to the next. */
export declare const budgetPeriod: {
    label: string;
    start: string;
    today: string;
    payday: string;
};
export declare const income: {
    id: string;
    label: string;
    amount: number;
    who: PersonId | null;
}[];
export type CategoryId = 'groceries' | 'eating' | 'transport' | 'home' | 'fun' | 'health';
export interface BudgetCategory {
    id: CategoryId;
    label: string;
    icon: IconName;
    /** What the household plans to spend on it this period, €. */
    budget: number;
}
export declare const categories: BudgetCategory[];
export interface Expense {
    id: string;
    /** ISO day. */
    date: string;
    label: string;
    category: CategoryId;
    amount: number;
    paidBy: PersonId;
    /** Split half and half between the two. */
    shared: boolean;
}
export declare const expenses: Expense[];
export interface Bill {
    id: string;
    label: string;
    icon: IconName;
    amount: number;
    /** ISO day it is due. */
    due: string;
    paid: boolean;
}
export declare const bills: Bill[];
export type Aisle = 'Fruit & veg' | 'Dairy & eggs' | 'Bakery' | 'Pantry' | 'Meat & fish';
export declare const aisles: Aisle[];
export type Unit = 'g' | 'ml' | 'pc' | 'tbsp' | 'tsp';
export interface Ingredient {
    name: string;
    /** For the recipe's own `serves`. */
    qty: number;
    unit: Unit;
    aisle: Aisle;
}
export interface RecipeStep {
    text: string;
    /** A step that waits: it gets its own cooking timer. */
    minutes?: number;
}
export interface Recipe {
    id: string;
    name: string;
    /** Hands-on plus waiting time. */
    minutes: number;
    serves: number;
    ingredients: Ingredient[];
    steps: RecipeStep[];
}
export declare const recipes: Recipe[];
export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type MealId = 'breakfast' | 'lunch' | 'dinner';
export declare const days: {
    id: DayId;
    label: string;
    short: string;
    date: number;
}[];
export declare const mealToday: DayId;
export declare const meals: {
    id: MealId;
    label: string;
}[];
export interface PlannedMeal {
    recipe: string;
    /** How many it is cooked for; the recipe and the shopping list scale to it. */
    servings: number;
}
export type WeekPlan = Record<DayId, Record<MealId, PlannedMeal | null>>;
export declare const weekPlan: WeekPlan;
/** Things most kitchens keep; they start ticked off, since they are usually there. */
export declare const pantryStaples: string[];
export type Sport = 'run' | 'ride';
export declare const sportIcon: Record<Sport, IconName>;
export interface TrainingSession {
    id: string;
    day: DayId;
    sport: Sport;
    title: string;
    /** Km — done, or planned while `done` is false. */
    km: number;
    /** Seconds; 0 while planned. */
    seconds: number;
    done: boolean;
}
export declare const trainingToday: DayId;
export declare const trainingWeek: TrainingSession[];
/** Kilometres per past week (oldest first), the current week is appended live. */
export declare const trainingHistory: {
    label: string;
    km: number;
}[];
export declare const thisWeekLabel = "9 Nov";
export declare const trainingRail: {
    id: string;
    label: string;
    icon: IconName;
}[];
export declare function historyPoints(current: number): LinePoint[];
