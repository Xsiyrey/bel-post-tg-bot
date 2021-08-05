const commandNameRegex: RegExp = /^\/(\w+)/;

export class BaseCommand implements IBaseCommand {
  name: string;
  constructor(name: string, action: (...props: any) => void) {
    this.name = name;
    this._action = action;
  }

  execute(...props: any) {
    this._action(...props);
  }

  nameMatch(str: string): boolean {
    return (
      (commandNameRegex
        .exec(str)
        ?.findIndex((match) => match.toLowerCase() === this.name) ?? -1) !== -1
    );
  }

  private _action: (...props: any) => void;
}
