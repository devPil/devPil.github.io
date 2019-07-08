const ghpages = require('gh-pages');
ghpages.publish(
  'public', {
    branch: 'master',
    repo: 'https://github.com/devPil/devPil.github.io.git',
  }, error => {
    let messages = "Deploy Complete!"
    if (error) {
      messages = `Error: ${Error}`;
    }
    return console.log(messages);
  }
)