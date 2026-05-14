const fs = require('fs');
const path = require('path');

function resolveConflictsInDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            resolveConflictsInDir(fullPath);
        } else if (stat.isFile() && (fullPath.endsWith('.js') || fullPath.endsWith('.css'))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // If the file has conflict markers
            if (content.includes('<<<<<<< HEAD')) {
                // Regex to match the entire conflict block and capture the HEAD part
                // <<<<<<< HEAD\n(capture this)\n=======\n(ignore this)\n>>>>>>> hash\n
                const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [a-f0-9]+\r?\n?/g;
                
                const newContent = content.replace(regex, '$1');
                
                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log(`Resolved conflicts in: ${fullPath}`);
                }
            }
        }
    }
}

resolveConflictsInDir(path.join(__dirname, 'src'));
console.log('Done resolving conflicts.');
