export interface IGetStartedData {
  data: IGetStartedProps
}

export interface IGetStartedProps {
  title: string
  description: string
  commands: IGetStartedCommand[]
}

export interface IGetStartedCommand {
  id: string
  command: string
}
