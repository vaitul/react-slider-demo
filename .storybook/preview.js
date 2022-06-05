import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import "../src/index.css"

const customViewports = {
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
  Laptop: {
    name: 'Laptop',
    styles: {
      width: '1100px',
      height: '706px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport:{
    viewports:customViewports
  }
}