function stringifyCSS(flatCSS: string[]): string {
  return flatCSS
    .reduce((rules: string[], item: string) => {
      return [...rules, item];
    }, [])
    .join(" ")
    .replace(/^\s*\/\/.*$/gm, "");
}

export default stringifyCSS;
