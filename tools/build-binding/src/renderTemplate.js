import ejs from 'ejs';
import fs from 'fs-extra';
import path from 'path';

const options = {};

export default async function renderTemplate(
  templateName,
  data = {},
  outPath = '.tmp',
  outName = null
) {
  const output = await new Promise((resolve, reject) => {
    const templatePath = path.resolve(
      __dirname,
      './templates',
      `${templateName}.ejs`
    );
    ejs.renderFile(templatePath, data, options, (err, output) => {
      if (err) return reject(err);
      return resolve(output);
    });
  });
  outPath = path.resolve(process.cwd(), outPath);
  if (!(await fs.exists(outPath))) fs.mkdir(outPath);
  return fs.writeFile(path.resolve(outPath, outName || templateName), output);
}
