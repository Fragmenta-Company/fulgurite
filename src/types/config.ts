
export enum configKind {
  Button = 'button',
  Select = 'select',
  Slider = 'slider',
  Switch = 'switch',
  Toggle = 'toggle',
  numberInput = 'number',
  stringInput = 'string',
  path = 'path',
  date = 'date',
  time = 'time',
  datetime = 'datetime'
}

interface config {
  id: string,
  category?: string,
  name: string,
  description: string,
  content: {
    id: string,
    kind: configKind,
    title: string,
    description: string,
    content?: string,
    category?: string
  }[]
}

export default config;
