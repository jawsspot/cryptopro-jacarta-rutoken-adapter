declare global {
    interface Window {
        chrome?: typeof chrome;
        /**добавляет расширение rutoken, этот объект был в fireFox */
        InstallTrigger?: any;
        /**Это свойство используется для определения режима документа в Internet Explorer.*/
        documentMode?: number;
        /**что-то от cades-plugin */
        cadesplugin_load_timeout: any
        rutokenLoaded: any;
        /**что-то от cades-plugin */
        cadesplugin_skip_extension_install: any
    }
    interface Document {
        /**Это свойство используется для определения режима документа в Internet Explorer.*/
        documentMode?: number;
    }

    // Объявление ActiveXObject для  IE
    var ActiveXObject: {
        new(s: string): any;
    };

    // cpcsp_chrome_nmcades 
    var cpcsp_chrome_nmcades: any;
    interface CertEnrollClassFactoryElement extends HTMLElement {
        CreateObject: (name: string) => any;
    }
}


export { };