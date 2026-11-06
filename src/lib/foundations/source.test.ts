import { appSource } from './source';

describe('appSource', () => {
  it('imports the library as the package', () => {
    const raw = `<script lang="ts">
  import { Page, Button } from '../../index';
  import type { NavGroup } from "../../index.ts";
</script>
`;
    expect(appSource(raw)).toBe(`<script lang="ts">
  import { Page, Button } from '@bonbon-ui/core';
  import type { NavGroup } from "@bonbon-ui/core";
</script>`);
  });

  it('puts demo pictures next to the file', () => {
    expect(appSource(`import photo from '../../demo/assets/room.jpg';`)).toBe(
      `import photo from './room.jpg';`,
    );
  });

  it('leaves every other path and string alone', () => {
    const raw = `import { x } from './local';\nconst s = 'index';\nimport y from '../../indexes';`;
    expect(appSource(raw)).toBe(raw);
  });
});
