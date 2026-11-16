/**
   * UserMenu molecule — the avatar chip in the header that opens an account menu: "Signed in
   * as …" and Sign out. Extra menu items can come in as `children` (use `role="menuitem"`).
   * A preset of DropdownMenu: the chip and the menu are liquid glass, the menu grows out of the
   * chip, and arrows, Escape, Tab and outside clicks behave like every other menu.
   *
   *   <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={signOut} />
   */
import type { Snippet } from 'svelte';
import type { PaletteColor } from '../atoms/palette';
interface Props {
    email: string;
    name?: string | undefined;
    /** The person's own colour for the avatar (as on their cursor and name tags); default the tint. */
    color?: PaletteColor | 'accent' | 'auto' | undefined;
    heading?: string;
    signOutLabel?: string;
    menuLabel?: string;
    /** Without it there is nothing to sign out of (e.g. a gateway session): no menu item. */
    onsignout?: (() => void) | undefined;
    children?: Snippet | undefined;
}
declare const UserMenu: import("svelte").Component<Props, {}, "">;
type UserMenu = ReturnType<typeof UserMenu>;
export default UserMenu;
