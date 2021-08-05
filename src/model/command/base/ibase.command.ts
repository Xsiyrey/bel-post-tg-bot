interface IBaseCommand {
  name: string;

  /**
   * Execute command with args
   * @param props Command execute args
   */
  execute(...props: any);

  /**
   * Validate command name
   * @param str Name
   */
  nameMatch(str: string): boolean;
}