
import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

/**
 * Sunduğumuz içeriği remote projelerimizde kullanmak için bu dosyaların içinde bulunan index.html dosyasına ekleyeceğiz.
 * Remote projelerimizde kullandığımız html dosyası yanlızca Isolation ortamda geçerlidir.
 * Dolayısı ile Host projemizi geliştiren ekip Remote projedeki htmli id veya classı bilemeyebilir veya kullanmayı tercih etmek istemeyebilirir.
 * Bu sebeple js kaynağımızı html elementi dinamik olarak seçilebilcek şekilde sunmalıyız.
 */
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

/**
 * Isolation ortam için
 * Dosyayı isolation ortamda ve development modunda kullanıyoruz.
 * Html dosyamızda kesinlikle bildiğimiz ve host ortamında bulunmayan bir wrapper mevcut.
 */
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

/**
 * Host ortam için
 * Dosyayı host ortamda kullanıyoruz.
 * Html dosyamızda kesinlikle bildiğimiz bir wrapper mevcut değil.
 * Ayrıca host proje geliştiricileri kodu hemen çalıştırmak istemeyebilir.
 */
export { mount };
