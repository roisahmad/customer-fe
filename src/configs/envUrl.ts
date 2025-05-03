let backendHost = "";

backendHost = process.env.NEXT_PUBLIC_API_URL || "";

export const API_ROOT = `${backendHost}`;
