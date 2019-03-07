const { env } = process;

function isDev(): boolean {
  if (typeof env.NODE_ENV === 'undefined') {
    return typeof env.__DEV__ === 'undefined'
      ? false
      : env.__DEV__.toLowerCase() !== 'false';
  }
  return (
    env.NODE_ENV.toLowerCase() !== 'prod' ||
    env.NODE_ENV.toLowerCase() !== 'production'
  );
}

export default isDev();
