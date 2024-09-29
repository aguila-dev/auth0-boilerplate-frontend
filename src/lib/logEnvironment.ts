const logEnvironment = () => {
  console.log('logEnvironment...');
  const environment = import.meta.env.MODE;
  switch (environment) {
    case 'development':
      console.log(`development: ${environment} env...`);
      break;
    case 'staging':
      console.log(`staging: ${environment} env...`);
      break;
    case 'production':
      console.log(`production: ${environment} env...`);
      break;
    default:
      console.log(`unknown environment: ${environment} env...`);
  }
  const envFile = `.env.${environment}`;
  console.log(`Loading environment variables from: ${envFile}`);
};

export default logEnvironment;
