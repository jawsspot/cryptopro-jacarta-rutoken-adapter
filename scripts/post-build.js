const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../dist');

function addJsExtension(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const result = data.replace(/(from\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
        if (!p2.endsWith('.js') && !p2.endsWith('.ts')) {
            return `${p1}${p2}.js${p3}`;
        }
        return match;
    });

    fs.writeFileSync(filePath, result, 'utf8');
}

function processDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file);

            if (fs.lstatSync(fullPath).isDirectory()) {
                processDirectory(fullPath);
            } else if (path.extname(fullPath) === '.js') {
                addJsExtension(fullPath);
            }
        });
    });
}

processDirectory(directoryPath);