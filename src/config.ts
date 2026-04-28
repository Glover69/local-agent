// Config file for loading environmental variables before app starts

const required = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required environment variable: ${key}`);
    return value;
};

export const config = {
    port: Number(process.env.PORT) || 5200,
    sendblue: {
        givenNumber: required("SENDBLUE_NUMBER"),
        personalNumber: required("PERSONAL_NUMBER"),
        apiKey: required("SENDBLUE_API_API_KEY"),
        secretKey: required("SENDBLUE_API_API_SECRET"),
    },
    composioAPIKey: required("COMPOSIO_API_KEY"),
    ngRokToken: required("NGROK_TOKEN"),
    lmAPIToken: required("LM_API_TOKEN"),

};