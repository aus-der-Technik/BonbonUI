// The handbook's live examples are real components, imported a second time with `?raw` so the
// code on the page is the code that runs. Inside this repo they import the library by a
// relative path; an app imports the package. `appSource` rewrites only those paths.
/** The public API, reached from `foundations/<folder>/`. */
const LIBRARY = /(['"])(?:\.\.\/)+index(?:\.ts)?\1/g;
/** A picture from the demo assets: in an app it sits next to the file. */
const ASSET = /(['"])(?:\.\.\/)+demo\/assets\/([^'"]+)\1/g;
/** A live example's source as an app would write it. */
export function appSource(source) {
    return source
        .replace(LIBRARY, (_, q) => `${q}@bonbon-ui/core${q}`)
        .replace(ASSET, (_, q, file) => `${q}./${file}${q}`)
        .trimEnd();
}
