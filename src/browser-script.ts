// Simple live-reload script (TypeScript)
(() => {
  const ws = new WebSocket('ws://' + location.hostname + ':35729');
  ws.onmessage = (msg: MessageEvent) => {
    if (msg.data === 'reload') {
      window.location.reload();
    }
  };
  ws.onclose = () => {
    // Try to reconnect every 2s
    setTimeout(() => location.reload(), 2000);
  };
})();
