import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Window } from "@tauri-apps/api/window";

export default async function openSettings(w: Window) {
  let options_webview = new WebviewWindow("options", {
    title: "Options - Fulgurite",
    parent: w,
    url: "/options",
    decorations: false,
    transparent: true
  });

  options_webview.once('tauri://created', () => {
    // webview successfully created
    w.hide();
  });
  options_webview.once('tauri://error', (e) => {
    // an error happened creating the webview
    w.show();
    console.log(e.payload)
  });

  options_webview.once('tauri://close-requested', () => {
    w.show();
    options_webview.close();
  })
}
