export class CommandCollection implements ICommandCollection {
  /**
   * 
   * @param commands Command list for execute
   */
  constructor(commands: IBaseCommand[]) {
    this._commands = commands;
  }

  execute(name: string, ...props: any) {
    const command = this._commands.find((x) => x.nameMatch(name));
    if (command) return command.execute(props);
  }

  private _commands: IBaseCommand[];
}