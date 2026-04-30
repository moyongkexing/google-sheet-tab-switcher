import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createShadowRootUi } from 'wxt/utils/content-script-ui/shadow-root';
import { SheetSwitcher } from '../src/components/SheetSwitcher';
import '../src/index.css';
import type { Sheet } from '../src/types';

const TAB_NAME_SELECTOR = '.docs-sheet-tab-name';
const TAB_SELECTOR = '.docs-sheet-tab';

const getSheetElements = () => {
  return Array.from(document.querySelectorAll<HTMLElement>(TAB_NAME_SELECTOR));
};

const getSheets = (): Sheet[] => {
  return getSheetElements()
    .map((el) => ({ name: el.textContent?.trim() ?? '' }))
    .filter((sheet) => sheet.name.length > 0);
};

const findTabElementByName = (sheetName: string) => {
  const sheetElements = getSheetElements();
  const targetEl = sheetElements.find((el) => el.textContent?.trim() === sheetName);

  return targetEl?.closest<HTMLElement>(TAB_SELECTOR) ?? null;
};

const switchSheet = (sheet: Sheet) => {
  const tabElement = findTabElementByName(sheet.name);

  if (!tabElement) {
    console.warn(`Could not find tab element for sheet "${sheet.name}"`);
    return;
  }

  tabElement.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );
};

export default defineContentScript({
  matches: ['https://docs.google.com/spreadsheets/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'google-sheet-tab-switcher',
      position: 'inline',
      anchor: 'body',
      onMount(container) {
        const app = document.createElement('div');
        app.style.pointerEvents = 'none';
        container.append(app);

        const root = ReactDOM.createRoot(app);
        root.render(
          <StrictMode>
            <SheetSwitcher getSheets={getSheets} onSheetSelect={switchSheet} />
          </StrictMode>,
        );

        return root;
      },
      onRemove(root) {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
