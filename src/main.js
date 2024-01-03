import { loadScript, loadStyle } from "@/utils/loadSource";

loadSource(async () => {
  const App = await import("./App.vue");
  Vue.createApp(App.default).use(ElementPlus).mount("#app");
});

function loadSource(callback) {
  loadScript(
    import.meta.env.DEV ? `vue/vue.js` : `vue/vue.prod.js`,
    "Vue3Ref",
    "Vue"
  ).then(() => {
    Promise.all([
      loadScript(`element-plus/index.min.js`, "ElementPlusRef", "ELEMENTPLUS"),
    ]).then(() => callback());
  });
  loadStyle(`element-plus/index.css`, "ElementPlusStyleRef");
}
