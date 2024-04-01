# Introduction

ChatGPT Presets is a Chrome extension that allows you to create and use customizable presets for seamless interaction with the ChatGPT web app. With this extension, you can define preset buttons and input boxes, which will be displayed in a convenient popup UI, enabling you to streamline your ChatGPT conversations.

Features
Customizable Presets: Create and manage presets with predefined text inputs and buttons tailored to your specific needs.
Popup UI: Access your presets through a sleek and user-friendly popup interface, eliminating the need to navigate away from the current page.
Seamless Integration: Leveraging the power of the ChatGPT web app, this extension acts as a bridge, facilitating efficient communication with the AI assistant.

⚠️ Please note that templates are currently slightly broken but will be fixed soon.

# Contributing
Contributions are welcome! If you encounter any bugs or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
