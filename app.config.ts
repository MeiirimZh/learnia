import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = process.env.APP_VARIANT ?? "prod";

  return {
    ...config,
    name: config.name ?? "Learnia",
    slug: config.slug ?? "learnia",
    android: {
      ...config.android,
      package:
        variant === "demo"
          ? "com.meiirim.zhanzhumanov.learnia.demo"
          : "com.meiirim.zhanzhumanov.learnia"
    },
    extra: {
      ...(config.extra ?? {}),
      APP_VARIANT: variant
    }
  };
};