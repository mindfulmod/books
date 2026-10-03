export function readingPreferences(value={}) {
  return {
    size:['standard','larger','largest'].includes(value?.size)?value.size:'standard',
    spacing:value?.spacing==='open'?'open':'standard',
    focus:value?.focus==='quiet'?'quiet':'garden'
  };
}
