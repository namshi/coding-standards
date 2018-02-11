/**
 * The original contributor <shidhin.cr@namshi.com>
 *
 * Code formatting is one of the common issues we faced in most of our reviews.
 * Though, we used to follow some coding formats, it was not strictly enforced. Moreover, it was difficult to set it up without editors/build-tools.
 *
 * Prettier ( from Facebook guys ), is a wonderful tool to format the codes.
 * I have set it up in my editor and really saved a lot of time fixing the formatting issues.
 * It will be a good option if we can set it up in our repositories ( though pre-commit scripts/hook ) so that we don’t need to worry about the code-formatting issues anymore.
 * I have created a small helper code here for easily adding the pre-commit scripts to any repo.
 *
 * https://github.com/namshi/coding-standards/blob/master/jsSupportFiles/install-precommit-commands.js
 *
 * You can also include the eslint file simply by download it from:
 *  wget https://raw.githubusercontent.com/namshi/coding-standards/master/jsSupportFiles/.eslintrc
 *
 * So, we just need to call this in any repo by this command:
 *
 * curl https://raw.githubusercontent.com/namshi/coding-standards/master/jsSupportFiles/install-precommit-commands.js | node
 *
 * Running the above command will modify the package.json and install the required dependencies.
 *
 * It will also add the following npm scripts:
 * `lint-staged` => This is the actual pre-commit scripts. Whenever you try to commit,
 *  it will take the staged files, run eslint and prettier on it, and commit the files.
 *
 * But if we want to format the existing files, we can run :
 * 'eslint YOUR_FILE_OR_DIR'
 * 'prettier YOUR_FILE_OR_DIR'
 */

const prettierOptions = '--single-quote --jsx-bracket-same-line --trailing-comma es5';

const generateBlocks = (pkg, keys) => {
  keys.forEach(key => {
    if (!pkg[key]) pkg[key] = {};
  });
};

const _message = message => {
  console.log('-> ', message);
};

try {
  let pkg = require('./package.json');
  let fs = require('fs');
  let exec = require('child_process').exec;
  let isYarn = fs.existsSync('./yarn.lock');
  let args = process.argv.slice(2);
  if (!isYarn) {
    isYarn = args.indexOf('--npm') === -1;
  }
  generateBlocks(pkg, ['devDependencies', 'scripts', 'lint-staged', 'husky']);
  _message('Configuring pre-commit ...');
  pkg.devDependencies['lint-staged'] = '*';
  pkg.devDependencies['husky'] = 'next';
  pkg.devDependencies['eslint'] = '*';
  pkg.devDependencies['prettier'] = '*';
  pkg.scripts.eslint = `eslint --fix`;
  pkg.scripts.prettier = `prettier --write ${prettierOptions} `;
  pkg['lint-staged']['*.js'] = ['eslint', 'prettier', 'git add'];
  pkg['husky']['hooks'] = {'pre-commit': 'lint-staged'};
  _message('Writing package.json ...');
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));

  if (isYarn) {
    _message('Installing dependencies using YARN...');
    exec('yarn', { shell: '/bin/sh' }, (err, stdout, stderr) => {
      console.log('Installed the dependencies', stdout, stderr);
    });
  } else {
    _message('Installing dependencies using NPM...');
    exec(
      'npm install --only=dev',
      { shell: '/bin/sh' },
      (err, stdout, stderr) => {
        console.log('Installed the dependencies', stdout, stderr);
      }
    );
  }
} catch (err) {
  _message('Error occured :: ', err.toString());
}
