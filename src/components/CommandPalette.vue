<script setup lang="ts">
import { ref } from 'vue';
import Command from './ui/command/Command.vue';
import CommandGroup from './ui/command/CommandGroup.vue';
import CommandInput from './ui/command/CommandInput.vue';
import CommandItem from './ui/command/CommandItem.vue';
import CommandList from './ui/command/CommandList.vue';
import CommandSeparator from './ui/command/CommandSeparator.vue';
import CommandEmpty from './ui/command/CommandEmpty.vue';
import CommandShortcut from './ui/command/CommandShortcut.vue';

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-vue-next'
import openSettings from '../helpers/openSettings';
import { getCurrentWindow } from '@tauri-apps/api/window';

const hidden = ref(true);

function hide_command_list() {
  setTimeout(() => {
    hidden.value = true;
  }, 100);
}


</script>

<style scoped lang="css">
.command-wrapper {
  position: relative;
  display: inline-block;
}

.command-list {
  position: absolute;
  top: 3px; /* Places it just below the input */
  left: 25%;
  z-index: 10;
}

</style>

<template>
  <div class="command-list max-w-[50%]">
    <Command class="rounded-lg border">
      <CommandInput class="h-[25px]" @blur="hide_command_list" @focus="hidden = false" placeholder="Type a command or search..." />
      <CommandList :hidden="hidden" >
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem value="search">
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled value="calculator">
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem @click="console.log('balls')" value="profile">
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem value="billing">
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem @click="openSettings(getCurrentWindow())" value="settings">
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
    </div>
</template>
