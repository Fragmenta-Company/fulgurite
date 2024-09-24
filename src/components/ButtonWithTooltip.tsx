import { TooltipTrigger, Tooltip, TooltipContent } from "./ui/tooltip";

interface Props {
  children: any,
  buttonContent: any,
  class?: string,
  value?: string,
  onClick?: (e: MouseEvent) => void | Promise<void>
}

export default function ButtonWithTooltip(props: Props) {

  const value = props.value;

  return (
    <Tooltip>
      <TooltipTrigger onClick={props.onClick} value={value} class={props.class} as='button'>
        {props.buttonContent}
      </TooltipTrigger>
      <TooltipContent>
        {props.children}
      </TooltipContent>
    </Tooltip>
  )

}
