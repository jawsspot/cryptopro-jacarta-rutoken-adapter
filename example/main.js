import { CryptoProDriver } from '../src/crypto-pro/index.js';

const plugin = new CryptoProDriver();
async function initialize() {
    console.time('start')
    await plugin.loadPlugin();
    try {
        const isActual = await plugin.isActualVersionPlugin();
        console.timeEnd('start')
        return {
            isActual: true
        }

    } catch {
        return {
            isActual: true
        }
    }
}


const meta = await initialize();

updateView(meta)

function updateView(data) {
    console.log('запустились')
    const el = document.getElementById('plugin_state');
    const child = document.createElement('div')
    child.innerHTML = data.isActual ? 'plugin is Loaded' : 'plugin is undefined';
    const count = document.createElement('div')
    count.innerHTML = plugin.parsedCertificates.length;
    count.style.color = 'green'
    el.appendChild(child);
    el.appendChild(count);


    for (let item of plugin.parsedCertificates) {
        let certificateEl = document.createElement('div')
        certificateEl.innerHTML = item.SubjectName;
        certificateEl.style.border = '1px solid red';
        el.appendChild(certificateEl);
    }


}
