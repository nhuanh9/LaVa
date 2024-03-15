import { exec } from 'child_process';

function openTerminals(numTerminals) {
    for (let i = 0; i < numTerminals; i++) {
        exec('start cmd /K node index.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error opening terminal: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`Terminal process stderr: ${stderr}`);
            }
        });
    }
}

const numTerminals = 30;
openTerminals(numTerminals);