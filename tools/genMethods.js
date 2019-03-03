import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';

async function genMethods() {
  const filePath = path.resolve(process.cwd(), process.argv[2]);
  const methodName = process.argv[3] || '';
  const body = (await fs.readFile(filePath)).toString();
  const methods = _.reduce(
    body.split('\n'),
    (methods, line) => {
      line = line.replace(/^[^\s]+\s+\*?\s?/g, '');
      line = line.replace(/\s\(\)$/g, '');
      if (methodName.length) {
        line = line.replace(new RegExp(`^gtk_${methodName}_`, 'g'), '');
      }
      if (line.indexOf(' ') > -1) return methods;
      if (!line.length) return methods;
      if (
        line.substr(0, 3) === 'get' ||
        line.substr(0, 3) === 'set' ||
        line.substr(0, 3) === 'new'
      ) {
        return methods;
      }
      const method = _.camelCase(line);
      methods.push(method);
      return methods;
    },
    []
  );
  process.stdout.write(
    _.map(methods, method => {
      return `${method}(...props) {
  this.node.${method}(...props);
}\n`;
    }).join('\n')
  );
}

genMethods();
