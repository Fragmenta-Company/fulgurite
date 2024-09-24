import { createSignal, For, Match, Show, Switch } from "solid-js";
import { Resizable, ResizableHandle, ResizablePanel } from "../components/ui/resizable";
import { cn } from "../lib/utils";
import ButtonWithTooltip from "../components/ButtonWithTooltip";
import config, { configKind } from "../types/config";
import { SwitchControl, Switch as Switcher, SwitchLabel, SwitchThumb } from "../components/ui/switch";

function ConfigPanel(props: {class?: string, configs: config[]}) {

  const [currentTab, setCurrentTab] = createSignal("");

  setCurrentTab(props.configs[0].id);

  function handleClick(id: string) {
    setCurrentTab(id);
  }

  function getConfigurations() {
    const config = props.configs.find(config => config.id === currentTab());

    function Fallback() {
      return (
        <div class="flex flex-col gap-2 overflow-y-auto h-full items-center justify-center p-3">
          <div>
            Error! No content found.
          </div>
        </div>
      )
    }

    return (
      <Show when={config?.content} fallback={<Fallback/>}>
        <div class="flex flex-col gap-2 overflow-y-auto h-full items-center p-3">
          <For each={config?.content}>
            {item => 
            <div class="flex w-full flex-row border-b-2 p-2">
              <div class="flex flex-col w-full">
                <p class="text-base truncate">{item.title}</p>
                <p class="text-sm">{item.description}</p>
              </div>
              <Switch>
                <Match when={item.kind === configKind.Button}>
                  <button class="text-nowrap w-fit p-2">{item.content}</button> 
                </Match>
                <Match when={item.kind === configKind.Switch}>
                  <Switcher class="flex flex-col items-center text-nowrap gap-2 justify-center w-fit">
                    <SwitchControl>
                      <SwitchThumb/>
                    </SwitchControl>
                    <SwitchLabel>{item.content}</SwitchLabel>
                  </Switcher>
                </Match>
                <Match when={item.kind === configKind.date}>
                  <div class="text-nowrap w-fit">
                    <input class="p-1" id={item.id} name={item.content} type="date" />
                    <label hidden for={item.id}>{item.content}</label>
                  </div>
                </Match>
              </Switch>
            </div>
            }
          </For>
        </div>
      </Show>
    )
  }

  function separateIntoCategories() {
    let categories: Record<string, config[]> = {};
    props.configs.forEach(config => {

      if(!config.category) {
        if(!categories['noCategory']) {
          categories['noCategory'] = [];
        }
        categories['noCategory'].push(config);
        return;
      }

      if (!categories[config.category]) {
        categories[config.category] = [];
      }

      categories[config.category].push(config);

    })
    return categories;
  }

  const categories = separateIntoCategories();

  return (
    <Resizable class={cn("rounded-lg border dark:text-white", props.class)}>
      <ResizablePanel initialSize={0.30} class="overflow-hidden bg-zinc-900">
        <div class="flex flex-col gap-2 justify-left overflow-y-auto overflow-x-hidden max-h-screen">
          <For each={Object.keys(categories)}>
            {key =>
              <div class="flex flex-col w-full p-3 gap-1">
                <p class="text-zinc-400 ml-3 text-sm">{key}</p>
                <For each={categories[key]}>
                {item =>
                  <ButtonWithTooltip onClick={() => handleClick(item.id)} class="py-1 bg-zinc-900 text-md px-2" buttonContent={item.name}>
                    {item.description}
                  </ButtonWithTooltip>
                }
                </For>
              </div>
            }
          </For>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={0.75} class="overflow-hidden dark:bg-zinc-900">
          <Show when={currentTab().length > 0}>
            {getConfigurations()}
          </Show>
      </ResizablePanel>
    </Resizable>
  )

}


export default function Config() {

  window.document.body.classList.add("dark");

  const configs = [
    {
      id: "123",
      name: "My config",
      category: "Categoria"
    },
    {
      id: "4123",
      name: "My other config",
      description: "My description",
      category: "Categoria",
      content: [
        {
          id: "123",
          kind: configKind.Switch,
          title: "My switch",
          description: "My switch description",
          category: "Category",
          // content: "My switch"
        },
        {
          id: "abc",
          kind: configKind.Button,
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
        {
          kind: configKind.date,
          id: "1234",
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
        {
          kind: configKind.Button,
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
        {
          kind: configKind.Button,
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
        {
          kind: configKind.Button,
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
        {
          kind: configKind.Button,
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
        {
          kind: configKind.Button,
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
        {
          kind: configKind.Button,
          title: "My button 2",
          description: "My other button description",
          category: "Category",
          content: "My button 2"
        },
      ]
    }
  ] as config[];

  return (
    <div class="h-screen w-screen p-3">
      <ConfigPanel configs={configs} class="w-full h-full dark" />
    </div>
  )

}
