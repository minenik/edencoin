const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const blocxus = require('./blocxus');

// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win;

ipcMain.handle('generate-address', () => blocxus.generateAddress());
ipcMain.handle('get-balance', (event, address) => blocxus.getBalance(address));
ipcMain.handle('send-transaction', (event, tx) => {
    try {
        return blocxus.sendTransaction(tx);
    } catch (e) {
        return { error: e.message };
    }
});

function createWindow () {
    // Создаёт окно браузера.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // и загрузит index.html приложение.
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Откроет DevTools.
    win.webContents.openDevTools();

    // Возникает, когда окно будет закрыто.
    win.on('closed', () => {
        // Разбирает объект окна, обычно вы можете хранить окна
        // в массиве, если ваше приложение поддерживает несколько окон в это время,
        // тогда вы должны удалить соответствующий элемент.
        win = null
    })
}

// Этот метод будет вызываться, когда Electron закончит
// инициализацию и готова к созданию окон браузера.
// Некоторые интерфейсы API могут использоваться только после возникновения этого события.
app.on('ready', createWindow);

// Выйти, когда все окна будут закрыты.
app.on('window-all-closed', () => {
    // На macOS это обычно для приложений и их строки меню
    // оставаться активным до тех пор, пока пользователь не выйдет явно с помощью Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // На MacOS это общее для того чтобы создать окно в приложении, когда значок
    // dock нажали и нет других открытых окон.
    if (win === null) {
        createWindow()
    }
});
