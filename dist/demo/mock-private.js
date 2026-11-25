export const people = {
    robin: { name: 'Robin Example', short: 'Robin', email: 'robin@example.com' },
    sam: { name: 'Sam Example', short: 'Sam', email: 'sam@example.com' },
};
/** The money period runs from one payday to the next. */
export const budgetPeriod = {
    label: 'November',
    start: '2026-10-25',
    today: '2026-11-14',
    payday: '2026-11-25',
};
export const income = [
    { id: 'pay-robin', label: 'Robin’s salary', amount: 2350, who: 'robin' },
    { id: 'pay-sam', label: 'Sam’s salary', amount: 1850, who: 'sam' },
    { id: 'sold', label: 'Sold the old pram', amount: 85, who: null },
];
export const categories = [
    { id: 'groceries', label: 'Groceries', icon: 'cart', budget: 620 },
    { id: 'eating', label: 'Eating out', icon: 'utensils', budget: 100 },
    { id: 'transport', label: 'Getting around', icon: 'bike', budget: 180 },
    { id: 'home', label: 'Home', icon: 'home', budget: 200 },
    { id: 'fun', label: 'Fun', icon: 'sparkles', budget: 70 },
    { id: 'health', label: 'Health', icon: 'heart', budget: 90 },
];
export const expenses = [
    {
        id: 'e14',
        date: '2026-11-14',
        label: 'Weekly shop',
        category: 'groceries',
        amount: 96.4,
        paidBy: 'robin',
        shared: true,
    },
    {
        id: 'e13',
        date: '2026-11-13',
        label: 'Bike tube and lights',
        category: 'transport',
        amount: 27.9,
        paidBy: 'sam',
        shared: false,
    },
    {
        id: 'e12',
        date: '2026-11-12',
        label: 'Pizza night',
        category: 'eating',
        amount: 38.5,
        paidBy: 'sam',
        shared: true,
    },
    {
        id: 'e11',
        date: '2026-11-10',
        label: 'Pharmacy',
        category: 'health',
        amount: 14.2,
        paidBy: 'robin',
        shared: false,
    },
    {
        id: 'e10',
        date: '2026-11-09',
        label: 'Bakery and market',
        category: 'groceries',
        amount: 31.8,
        paidBy: 'sam',
        shared: true,
    },
    {
        id: 'e9',
        date: '2026-11-07',
        label: 'Weekly shop',
        category: 'groceries',
        amount: 112.6,
        paidBy: 'robin',
        shared: true,
    },
    {
        id: 'e8',
        date: '2026-11-06',
        label: 'Cinema',
        category: 'fun',
        amount: 24,
        paidBy: 'robin',
        shared: true,
    },
    {
        id: 'e7',
        date: '2026-11-04',
        label: 'Light bulbs and a doormat',
        category: 'home',
        amount: 42.3,
        paidBy: 'sam',
        shared: true,
    },
    {
        id: 'e6',
        date: '2026-11-02',
        label: 'Train to the coast',
        category: 'transport',
        amount: 58,
        paidBy: 'robin',
        shared: true,
    },
    {
        id: 'e5',
        date: '2026-10-31',
        label: 'Weekly shop',
        category: 'groceries',
        amount: 104.2,
        paidBy: 'sam',
        shared: true,
    },
    {
        id: 'e4',
        date: '2026-10-30',
        label: 'Lunch with friends',
        category: 'eating',
        amount: 46.7,
        paidBy: 'robin',
        shared: false,
    },
    {
        id: 'e3',
        date: '2026-10-28',
        label: 'Board game',
        category: 'fun',
        amount: 34.99,
        paidBy: 'sam',
        shared: true,
    },
    {
        id: 'e2',
        date: '2026-10-26',
        label: 'Paint for the hallway',
        category: 'home',
        amount: 61.5,
        paidBy: 'robin',
        shared: true,
    },
    {
        id: 'e1',
        date: '2026-10-25',
        label: 'Weekly shop',
        category: 'groceries',
        amount: 88.9,
        paidBy: 'robin',
        shared: true,
    },
];
export const bills = [
    { id: 'pot', label: 'Holiday pot', icon: 'gift', amount: 400, due: '2026-10-26', paid: true },
    { id: 'rent', label: 'Rent', icon: 'home', amount: 1180, due: '2026-11-01', paid: true },
    { id: 'care', label: 'Childcare', icon: 'users', amount: 620, due: '2026-11-02', paid: true },
    { id: 'water', label: 'Water', icon: 'droplet', amount: 31, due: '2026-11-03', paid: true },
    { id: 'power', label: 'Electricity', icon: 'bolt', amount: 86, due: '2026-11-18', paid: false },
    { id: 'net', label: 'Home internet', icon: 'wifi', amount: 39, due: '2026-11-20', paid: false },
    { id: 'tax', label: 'Local taxes', icon: 'receipt', amount: 145, due: '2026-11-21', paid: false },
    {
        id: 'phone',
        label: 'Two phone plans',
        icon: 'phone',
        amount: 42,
        due: '2026-11-22',
        paid: false,
    },
    {
        id: 'insurance',
        label: 'Contents insurance',
        icon: 'shield',
        amount: 18,
        due: '2026-11-28',
        paid: false,
    },
];
export const aisles = ['Fruit & veg', 'Dairy & eggs', 'Meat & fish', 'Bakery', 'Pantry'];
export const recipes = [
    {
        id: 'oats',
        name: 'Overnight oats',
        minutes: 5,
        serves: 2,
        ingredients: [
            { name: 'Rolled oats', qty: 100, unit: 'g', aisle: 'Pantry' },
            { name: 'Milk', qty: 250, unit: 'ml', aisle: 'Dairy & eggs' },
            { name: 'Yoghurt', qty: 150, unit: 'g', aisle: 'Dairy & eggs' },
            { name: 'Apples', qty: 1, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Honey', qty: 1, unit: 'tbsp', aisle: 'Pantry' },
        ],
        steps: [
            { text: 'Stir the oats, milk and yoghurt together in two jars.' },
            { text: 'Grate the apple over the top, add honey, close the lids and chill overnight.' },
        ],
    },
    {
        id: 'eggs',
        name: 'Soft eggs on toast',
        minutes: 12,
        serves: 2,
        ingredients: [
            { name: 'Eggs', qty: 4, unit: 'pc', aisle: 'Dairy & eggs' },
            { name: 'Sourdough loaf', qty: 0.5, unit: 'pc', aisle: 'Bakery' },
            { name: 'Butter', qty: 20, unit: 'g', aisle: 'Dairy & eggs' },
            { name: 'Chives', qty: 5, unit: 'g', aisle: 'Fruit & veg' },
        ],
        steps: [
            { text: 'Bring a small pan of water to a gentle boil and lower in the eggs.' },
            { text: 'Boil the eggs for a soft, jammy middle.', minutes: 6 },
            { text: 'Toast and butter the bread, peel the eggs and scatter the chives.' },
        ],
    },
    {
        id: 'soup',
        name: 'Red lentil soup',
        minutes: 35,
        serves: 4,
        ingredients: [
            { name: 'Red lentils', qty: 250, unit: 'g', aisle: 'Pantry' },
            { name: 'Onions', qty: 1, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Carrots', qty: 2, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Vegetable stock', qty: 1200, unit: 'ml', aisle: 'Pantry' },
            { name: 'Lemons', qty: 1, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Ground cumin', qty: 1, unit: 'tsp', aisle: 'Pantry' },
        ],
        steps: [
            { text: 'Soften the chopped onion and carrots in a little oil.', minutes: 8 },
            {
                text: 'Add the lentils, cumin and stock; simmer until the lentils fall apart.',
                minutes: 20,
            },
            { text: 'Blend half of it, squeeze in the lemon and season to taste.' },
        ],
    },
    {
        id: 'pasta',
        name: 'Tomato and basil pasta',
        minutes: 20,
        serves: 2,
        ingredients: [
            { name: 'Spaghetti', qty: 200, unit: 'g', aisle: 'Pantry' },
            { name: 'Tomatoes', qty: 4, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Garlic cloves', qty: 2, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Basil', qty: 15, unit: 'g', aisle: 'Fruit & veg' },
            { name: 'Hard cheese', qty: 40, unit: 'g', aisle: 'Dairy & eggs' },
            { name: 'Olive oil', qty: 2, unit: 'tbsp', aisle: 'Pantry' },
        ],
        steps: [
            { text: 'Cook the spaghetti in plenty of salted water.', minutes: 10 },
            {
                text: 'Meanwhile warm the oil and garlic, add the chopped tomatoes and let them collapse.',
            },
            { text: 'Toss the pasta in the sauce with a splash of its water, basil and cheese.' },
        ],
    },
    {
        id: 'curry',
        name: 'Chickpea and spinach curry',
        minutes: 30,
        serves: 4,
        ingredients: [
            { name: 'Tins of chickpeas', qty: 2, unit: 'pc', aisle: 'Pantry' },
            { name: 'Coconut milk', qty: 400, unit: 'ml', aisle: 'Pantry' },
            { name: 'Spinach', qty: 200, unit: 'g', aisle: 'Fruit & veg' },
            { name: 'Onions', qty: 1, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Garlic cloves', qty: 3, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Curry paste', qty: 2, unit: 'tbsp', aisle: 'Pantry' },
            { name: 'Rice', qty: 300, unit: 'g', aisle: 'Pantry' },
        ],
        steps: [
            { text: 'Fry the onion, garlic and curry paste until fragrant.', minutes: 5 },
            { text: 'Add chickpeas and coconut milk and simmer gently.', minutes: 15 },
            { text: 'Stir in the spinach until it wilts. Serve with rice.' },
        ],
    },
    {
        id: 'traybake',
        name: 'Lemon chicken traybake',
        minutes: 50,
        serves: 4,
        ingredients: [
            { name: 'Chicken thighs', qty: 8, unit: 'pc', aisle: 'Meat & fish' },
            { name: 'Potatoes', qty: 800, unit: 'g', aisle: 'Fruit & veg' },
            { name: 'Lemons', qty: 2, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Garlic cloves', qty: 4, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Thyme', qty: 5, unit: 'g', aisle: 'Fruit & veg' },
            { name: 'Olive oil', qty: 3, unit: 'tbsp', aisle: 'Pantry' },
        ],
        steps: [
            { text: 'Heat the oven to 200 °C. Toss everything on a tray with oil and lemon slices.' },
            { text: 'Roast until the skin is golden and the potatoes are crisp.', minutes: 40 },
            { text: 'Rest for five minutes and spoon the juices over.' },
        ],
    },
    {
        id: 'salmon',
        name: 'Salmon, greens and rice',
        minutes: 25,
        serves: 2,
        ingredients: [
            { name: 'Salmon fillets', qty: 2, unit: 'pc', aisle: 'Meat & fish' },
            { name: 'Broccoli', qty: 1, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Rice', qty: 150, unit: 'g', aisle: 'Pantry' },
            { name: 'Soy sauce', qty: 2, unit: 'tbsp', aisle: 'Pantry' },
            { name: 'Lemons', qty: 1, unit: 'pc', aisle: 'Fruit & veg' },
        ],
        steps: [
            { text: 'Start the rice.', minutes: 12 },
            { text: 'Bake the salmon with soy and lemon while the broccoli steams.', minutes: 12 },
            { text: 'Share it out and finish with a squeeze of lemon.' },
        ],
    },
    {
        id: 'wraps',
        name: 'Hummus and veg wraps',
        minutes: 10,
        serves: 2,
        ingredients: [
            { name: 'Tortilla wraps', qty: 4, unit: 'pc', aisle: 'Bakery' },
            { name: 'Hummus', qty: 200, unit: 'g', aisle: 'Dairy & eggs' },
            { name: 'Carrots', qty: 1, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Cucumber', qty: 0.5, unit: 'pc', aisle: 'Fruit & veg' },
            { name: 'Spinach', qty: 60, unit: 'g', aisle: 'Fruit & veg' },
        ],
        steps: [
            { text: 'Spread the wraps with hummus.' },
            { text: 'Pile on the grated carrot, cucumber and spinach, roll up and halve.' },
        ],
    },
    {
        id: 'pancakes',
        name: 'Sunday pancakes',
        minutes: 25,
        serves: 4,
        ingredients: [
            { name: 'Flour', qty: 200, unit: 'g', aisle: 'Pantry' },
            { name: 'Eggs', qty: 2, unit: 'pc', aisle: 'Dairy & eggs' },
            { name: 'Milk', qty: 300, unit: 'ml', aisle: 'Dairy & eggs' },
            { name: 'Berries', qty: 250, unit: 'g', aisle: 'Fruit & veg' },
            { name: 'Butter', qty: 30, unit: 'g', aisle: 'Dairy & eggs' },
        ],
        steps: [
            { text: 'Whisk flour, eggs and milk into a smooth batter and let it rest.', minutes: 10 },
            { text: 'Fry ladlefuls in a little butter, two minutes a side. Top with berries.' },
        ],
    },
];
export const days = [
    { id: 'mon', label: 'Monday', short: 'Mon', date: 9 },
    { id: 'tue', label: 'Tuesday', short: 'Tue', date: 10 },
    { id: 'wed', label: 'Wednesday', short: 'Wed', date: 11 },
    { id: 'thu', label: 'Thursday', short: 'Thu', date: 12 },
    { id: 'fri', label: 'Friday', short: 'Fri', date: 13 },
    { id: 'sat', label: 'Saturday', short: 'Sat', date: 14 },
    { id: 'sun', label: 'Sunday', short: 'Sun', date: 15 },
];
export const mealToday = 'thu';
export const meals = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
];
const p = (recipe, servings = 2) => ({ recipe, servings });
export const weekPlan = {
    mon: { breakfast: p('oats'), lunch: p('wraps'), dinner: p('soup', 4) },
    tue: { breakfast: p('oats'), lunch: p('soup'), dinner: p('pasta') },
    wed: { breakfast: p('eggs'), lunch: p('wraps'), dinner: p('curry', 4) },
    thu: { breakfast: p('oats'), lunch: p('curry'), dinner: p('salmon') },
    fri: { breakfast: p('eggs'), lunch: null, dinner: p('pasta', 3) },
    sat: { breakfast: null, lunch: p('wraps'), dinner: p('traybake', 4) },
    sun: { breakfast: p('pancakes', 4), lunch: null, dinner: null },
};
/** Things most kitchens keep; they start ticked off, since they are usually there. */
export const pantryStaples = ['Olive oil', 'Ground cumin', 'Honey', 'Soy sauce', 'Flour'];
export const sportIcon = { run: 'activity', ride: 'bike' };
export const trainingToday = 'thu';
export const trainingWeek = [
    {
        id: 's1',
        day: 'mon',
        sport: 'run',
        title: 'Easy run',
        km: 8.4,
        seconds: 46 * 60 + 10,
        done: true,
    },
    {
        id: 's2',
        day: 'tue',
        sport: 'ride',
        title: 'Commute, both ways',
        km: 18.2,
        seconds: 52 * 60,
        done: true,
    },
    {
        id: 's3',
        day: 'wed',
        sport: 'run',
        title: 'Intervals, 6 × 800 m',
        km: 9.1,
        seconds: 48 * 60 + 30,
        done: true,
    },
    { id: 's4', day: 'thu', sport: 'run', title: 'Recovery jog', km: 6, seconds: 0, done: false },
    { id: 's5', day: 'sat', sport: 'run', title: 'Long run', km: 16, seconds: 0, done: false },
    {
        id: 's6',
        day: 'sun',
        sport: 'ride',
        title: 'Hills with friends',
        km: 42,
        seconds: 0,
        done: false,
    },
];
/** Kilometres per past week (oldest first), the current week is appended live. */
export const trainingHistory = [
    { label: '24 Aug', km: 48 },
    { label: '31 Aug', km: 55 },
    { label: '7 Sep', km: 51 },
    { label: '14 Sep', km: 62 },
    { label: '21 Sep', km: 38 },
    { label: '28 Sep', km: 66 },
    { label: '5 Oct', km: 71 },
    { label: '12 Oct', km: 58 },
    { label: '19 Oct', km: 74 },
    { label: '26 Oct', km: 69 },
    { label: '2 Nov', km: 77 },
];
export const thisWeekLabel = '9 Nov';
export const trainingRail = [
    { id: 'week', label: 'This week', icon: 'calendar' },
    { id: 'workout', label: 'Workout', icon: 'play' },
    { id: 'history', label: 'History', icon: 'chart' },
];
export function historyPoints(current) {
    return [
        ...trainingHistory.map((w) => ({ label: w.label, value: w.km })),
        { label: thisWeekLabel, value: Math.round(current * 10) / 10 },
    ];
}
