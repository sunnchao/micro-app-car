import { ConfigEnv, UserConfig, loadEnv } from 'vite';
// import { userConfig as baseUserConfig, loadCurrentEnv } from '../vite.config.base';
import { wrapperEnv } from 'block-libs/dist/utils';
import { resolve as pathResolve, join as pathJoin } from 'path';
import { ViteEnv as ViteEnvType } from 'block-libs/types/env';
import { createVitePlugins } from '../../configs/vite/plugin';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd()) as unknown as ViteEnvType;
  const viteEnv = wrapperEnv(env);

  return {
    base: env.VITE_APP_BASE_URL,
    plugins: createVitePlugins(viteEnv, command === 'build'),
    resolve: Object.assign(
      {},
      {},
      {
        alias: [
          {
            find: '@/',
            replacement: `${pathResolve('src')}/`,
          },
          {
            find: '@root/',
            replacement: `${pathJoin(__dirname, '..', '..', '/')}`,
          },
        ],
      },
    ),
    server: Object.assign(
      {},
      {},
      {
        port: viteEnv.VITE_APP_PORT,
      },
    ),
  } as UserConfig;
};
