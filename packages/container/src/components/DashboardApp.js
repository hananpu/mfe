/**
 * dashboard => Host proje webpack.config.js remotes objesinde (dashboard için) key değeri.
 * DashboardApp => Remote proje (dashboard) webpack.config.js exposes objesinde "./src/bootstrap" için alias olarak kullanılan key değeri.
 */
 import React, { useEffect, useRef } from "react";
 import { mount } from "dashboard/DashboardApp";
 
 const DashboardApp = () => {
   const ref = useRef(null);
 
   useEffect(() => {
     mount(ref.current);
   }, []);
   
   /**
    * Spesifik bir divimiz olmadığından, yarattığımız dive useRef ile referans alıp mount fonksiyonuna gönderiyoruz.
    */
   return <div data-project="dashboard" data-framework="vue" ref={ref}></div>;
 };
 
 export default DashboardApp;
 