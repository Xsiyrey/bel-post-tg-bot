interface ICommandCollection {
  /**
   * Execute command action
   * @param name Command name
   * @param props Command args
   */
  execute(name: string, ...props: any);
}