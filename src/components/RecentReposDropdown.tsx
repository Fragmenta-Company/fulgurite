import { Accessor, createSignal, Setter } from "solid-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger
} from "~/components/ui/dialog"
// import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuGroup,
  // DropdownMenuGroupLabel,
  DropdownMenuItem,
  // DropdownMenuPortal,
  // DropdownMenuRadioGroup,
  // DropdownMenuRadioItem,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { showToast } from "~/components/ui/toast"

function DeleteAlertDialog(props: { open: Accessor<boolean>, setOpen: Setter<boolean>, name: string }) {

  const [typedName, setTypedName] = createSignal("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if(typedName() === props.name) {
      props.setOpen(false);
      showToast({
        variant: "destructive",
        title: `Deleted "${props.name}"`,
        description: `At ${new Date()}`
      })

    }
  }

  document.body.classList.add("dark");

  return (
    <>
    <Dialog open={props.open()} onOpenChange={props.setOpen}>
      <DialogContent as="form" onSubmit={handleSubmit}>
      <div class="mx-auto w-full max-w-sm gap-2 flex flex-col">
        <DialogHeader>
          <DialogTitle>Do you really want to delete this repository?</DialogTitle>
          <DialogDescription>
            Please spell <span class="text-red-700">{props.name}</span> below
            to delete the repository.
          </DialogDescription>
          <input onInput={(e) => setTypedName(e.target.value)} placeholder={props.name}></input>
        </DialogHeader>
        <DialogFooter class="flex flex-row gap-1">
          <button class="text-red-700 px-2 py-1 bg-black">
            Remove
          </button>
          <button type="button" class="px-2 py-1" onClick={() => props.setOpen(false)}>
            Close
          </button>
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )

}


export default function RecentReposDropdown(props: { children: any, id: string, name: string }) {

  const [open, setOpen] = createSignal(false);

  const idk = () => {
    console.log(props.id);
  }
  
  document.body.classList.add("dark");

  return (
    <>
    <DeleteAlertDialog open={open} setOpen={setOpen} name={props.name} />
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger as="div">{props.children}</DropdownMenuTrigger>
        <DropdownMenuContent class="w48">
          <DropdownMenuItem onClick={idk}>
            <span>Open in file explorer</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Rename repository</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Copy repository</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <span class="text-teal-400">Move repository</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(e => !e)}>
            <span class="text-red-700" >Remove repository</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    </>
  )

}
