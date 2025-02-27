function s(paths) {
  paths.forEach(p);
}
async function p(path) {
  const url = chrome.runtime.getURL(path);
  const content = await fetch(url).then((res) => res.text());
  const style = document.createElement('style');
  style.setAttribute('data-vite-dev-id', path);
  style.textContent = content;
  document.head.append(style);
}
s(["assets/main-QO04dVIp.css"]);
