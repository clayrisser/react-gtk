import ejs from 'ejs';
import fs from 'fs-extra';
import path from 'path';

export default async function renderTemplate(templateName, outPath, data = {}) {
  const templatePath = path.resolve(
    __dirname,
    './templates',
    `${templateName}.ejs`
  );
  const templateData = (await fs.readFile(templatePath)).toString();
  const output = ejs.render(templateData, data);
  outPath = path.resolve(process.cwd(), outPath);
  const outPathFolder = outPath.replace(/[^/]+$/, '');
  if (!(await fs.exists(outPathFolder))) fs.mkdir(outPathFolder);
  return fs.writeFile(path.resolve(outPath, outPath), output);
}
