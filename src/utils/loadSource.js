const isEnvProduction = import.meta.env.PROD;
const currentScriptPath = getRuningScriptPath();
const productionPrefix =
  currentScriptPath.split("/").slice(0, -2).join("/") + "/source/";
const prefix = isEnvProduction ? productionPrefix : "/pluginTemp/source/";

export function loadScript(path, loadFlag, mountedName, maxIntervalCount = 20) {
  if (window[mountedName]) {
    return new Promise(resolve => {
      resolve();
    });
  } else if (window[loadFlag]) {
    return window[loadFlag];
  }
  return (window[loadFlag] = new Promise(resolve => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    if (path.indexOf("http") > -1) {
      script.src = path;
    } else {
      script.src = `${prefix}${path}`;
    }
    document.head.appendChild(script);
    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          resolveFun(resolve, maxIntervalCount, mountedName);
        }
      };
    } else {
      //Others
      script.onload = function () {
        resolveFun(resolve, maxIntervalCount, mountedName);
      };
    }
  }));
}

function getRuningScriptPath() {
  if (document.currentScript && document.currentScript.src !== "") {
    return document.currentScript.src;
  }
  //Thanks to https://stackoverflow.com/a/42594856/5175935
  return new Error().stack.match(/(https?:[^:]*).*\.js/)[0];
}

function resolveFun(resolve, maxIntervalCount, mountedName) {
  let count = 0;
  const mountInterval = setInterval(() => {
    if (
      count >= maxIntervalCount ||
      (mountedName ? window[mountedName] : true)
    ) {
      clearInterval(mountInterval);
      resolve();
    }
    count++;
  }, 20);
}

// 动态加载样式
export function loadStyle(path, loadFlag) {
  if (window[loadFlag]) {
    return;
  }
  window[loadFlag] = true;
  const style = document.createElement("link");
  if (path.indexOf("http") > -1) {
    style.href = path;
  } else {
    style.href = `${prefix}${path}`;
  }
  style.type = "text/css";
  style.rel = "stylesheet";
  document.head.appendChild(style);
}
