process.stdout.write('static propTypes = {');
Object.keys(Object.getPrototypeOf(this.node)).forEach(key => {
  let type = typeof this.node[key];
  if (type === 'function') type = 'func';
  if (type === 'boolean') type = 'bool';
  if (type === 'object') {
    type = Array.isArray(this.node[key]) ? 'array' : 'object';
  }
  process.stdout.write(`${key}: PropTypes.${type},`);
});
process.stdout.write('}\n\nstatic defaultProps = {');
Object.keys(Object.getPrototypeOf(this.node)).forEach(key => {
  process.stdout.write(`${key}: null,`);
});
process.stdout.write('\n}');
