<script setup lang="ts">
import CommandPalette from './CommandPalette.vue';
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Settings, Minus, X, Square } from 'lucide-vue-next';
import openSettings from '../helpers/openSettings';

const appWindow = getCurrentWindow();

</script>

<template>
  <header data-tauri-drag-region class="flex flex-row justify-between items-center h-[32px] px-2 pt-[2px] border-b-zinc-700 border-b-1">
    <div class="flex">
      <button 
        :hidden="appWindow.label === 'options'" 
        @click="openSettings(appWindow)" 
        class="h-[25px] bg-transparent"><Settings class="hover:stroke-zinc-600 transition-all"/></button>
    </div>
    <CommandPalette class="w-[50%]" />
    <div class="flex flex-row gap-1 h-[29px]">
      <button @click="appWindow.close()"><X class="hover:stroke-zinc-600 transition-all"/></button>
      <button @click="appWindow.minimize()"><Minus class="hover:stroke-zinc-600 transition-all"/></button>
      <button @click="appWindow.toggleMaximize()"><Square class="hover:stroke-zinc-600 transition-all"/></button>
    </div>
  </header>
</template>
