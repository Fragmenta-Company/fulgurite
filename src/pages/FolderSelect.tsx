import { createSignal, For, Match, Show, Switch } from "solid-js";
import ThreeDots from "../assets/icons/three-dots-vertical.svg?component-solid";
import RecentReposDropdown from "../components/RecentReposDropdown";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { cn } from "../lib/utils";
import ButtonWithTooltip from "../components/ButtonWithTooltip";

const Fulgurite = async () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    return await import("../assets/Fulgurite_white.svg");
  } else {
    return await import("../assets/Fulgurite_black.svg");
  }
}

const selectOptions = {
  default: {
    text: "Language Selection"
  },
  list: [
    {
      text: "English (USA)",
      value: "en-us"
    },
    {
      text: "Portuguese (Brazilian)",
      value: "pt-br"
    }
  ]
}

interface RecentRepos {
  id: string,
  name: string,
  path: string
}

function Recents(props: { recentRepos: RecentRepos[], class?: string }) {

  return (
    <div class={cn("flex flex-col gap-2", props.class)}>
      <For each={props.recentRepos}>
      {repo => {
        return (
          <div class="p-2 gap-2 w-fit rounded-lg bg-zinc-800 border-white
                hover:bg-zinc-700
                hover:cursor-pointer
                flex flex-row items-center transition-all duration-200">
            <div>
              <div class="font-bold text-lg" >{repo.name}</div>
              <div class="font-light text-sm truncate hover:whitespace-normal sm:w-52 md:w-72 lg:w-96" >{repo.path}</div>
            </div>
            <button class="p-1 rounded-3xl bg-transparent hover:bg-slate-800 transition-all duration-300" >
              <RecentReposDropdown id={repo.id} name={repo.name}>
                <ThreeDots class="w-6 h-6 fill-white" />
              </RecentReposDropdown>
            </button>
          </div>
        )
      }}
      </For>
    </div>
  )

}

export default function FolderSelect() {

  const [image, setImage] = createSignal("");
  const [ready, setReady] = createSignal(false);
  const [repos, setRepos] = createSignal([] as RecentRepos[]);
  const [version, setVersion] = createSignal("");

  (async () => {
    setImage((await Fulgurite()).default);
    const repos: RecentRepos[] = await invoke('list_known_repositories', {});
    setRepos(repos);
    // window.document.body.classList.add("dark");
    setVersion(await invoke('get_fulgurite_version'));
    setReady(true);
    console.log(repos);
  })()

  function openConfig() {
    
    const configWebView = new WebviewWindow("config", {
      url: "/config",
      title: "Config"
      // parent: getCurrentWindow()
    })

    configWebView.once("tauri://webview-created", () => {
      
    });

    configWebView.once("tauri://error", (e) => {
      console.log(e);
    })
    
  }

  return (
    <Show when={ready()} fallback={<div>Loading...</div>}>
      <div class="grid grid-cols-2">
        <Recents recentRepos={repos()} class="bg-zinc-900 pl-3 pt-3 overflow-y-auto max-h-screen" />
        <div class="flex flex-row min-h-screen justify-center items-center">
          <div class="flex flex-col justify-center w-64 gap-2">
            <img class="fill-black dark:fill-white pb-1" src={image()} />
            <p class="text-center text-gray-500 pb-3" >Version {version()}</p>
            <ButtonWithTooltip class="hover:border-white" buttonContent="Open repository" >
              Open an existing repository 
            </ButtonWithTooltip>
            <ButtonWithTooltip class="hover:border-blue-300" buttonContent="Open storage in cloud" >
              Open an existing repository in the cloud
            </ButtonWithTooltip>
            <ButtonWithTooltip class="hover:border-lime-300" buttonContent="Sync repository to cloud" >
              Sync an existing repository to cloud
            </ButtonWithTooltip>
            <select>
              <option disabled selected >{selectOptions.default.text}</option>
              <For each={selectOptions.list}>{
                item => 
                <Switch fallback={<option value={item.value}>{item.text}</option>}>
                  <Match when={!item.value}>
                    <option disabled>{item.text}</option>
                  </Match> 
                </Switch>
              }</For>
            </select>
            <button onClick={() => openConfig()}>Options</button>
          </div>
        </div>
      </div>
    </Show>
  )

}
