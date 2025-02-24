export const getServerEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value)
    throw new Error(
      `Missing env variable: ${key}, make sure you are accessing it from server side only and check your .env file`
    )
  return value
}
