const { exec } = require('child_process');

function execAsync(command, options) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve({stdout, stderr});
    });
  });
}

module.exports = execAsync;
