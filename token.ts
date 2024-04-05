export default (): string => {
  const token =
    process.env.NODE_ENV === "production"
      ? process.env.DJS_BOT_TOKEN_PRODUCTION
      : process.env.DJS_BOT_TOKEN;

  if (!token) {
    console.error(
      `Invalid token: ${token}. (DJS_BOT_TOKEN environment variable)`
    );
    process.exit(1);
  }

  return token;
};
