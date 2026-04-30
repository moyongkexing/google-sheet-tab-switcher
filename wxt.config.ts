import { defineConfig } from 'wxt';

const icons = {
  '16': 'icons/icon16.png',
  '32': 'icons/icon32.png',
  '48': 'icons/icon48.png',
  '128': 'icons/icon128.png',
};

export default defineConfig({
  manifestVersion: 3,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: '__MSG_extensionName__',
    short_name: '__MSG_extensionShortName__',
    description: '__MSG_extensionDescription__',
    default_locale: 'en',
    icons,
    action: {
      default_title: '__MSG_extensionName__',
      default_icon: icons,
    },
    host_permissions: ['https://docs.google.com/spreadsheets/*'],
  },
});
