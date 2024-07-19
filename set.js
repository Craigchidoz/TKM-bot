const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0ErT1Mvb3dpQ24vNnJBMmkzSGllcWY1ekR2VFFDVHFyKzRjTzRXOW5XND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialR0RGdValRwTWpkWU0xQnk4YW96QnlKQmY1VENTSjlvQ0Qvc3kxRjJUST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTUIvNjZHWEtwN05RUVNEc2NkQzBtVWs1ZHlzRHNmRVR3aW92cEdsM0ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQTBXTHFya3dxSVZ1Ym9NODhjV2QvK0szU3dPOS9RT1NQQmlGVmNzOFNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1PNGd0OG9DczBYWjNUSTNpSHRqdlZkOVdPeFhReWl4MElZeXQzeGs2MkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImsrdndnY21BbnQ1b2prZWVrVktpVnpDNkRTdXNlTnFxUHFQalE4cC96aDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk94OTRDaUhPK1J3dkJqMEJBcS9CZEx3WU4xdGxUeEZKdGNiRGx3aTdITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDZPRVA2L1l6TWIvZDBTNTZNbGY5UDMxYW9hWDJPdnQzV1dNcDBWM2ZFRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNTUlBURzl4RlFiNm05ZDhDUzlKWGVCeUZEbkdvNUJycFVGSmhkemgwUkwwZnRJSnBiS2U3VXVqVmJzR243cko2cDlaRUgxZkNNTUZKWlZzbmd0RWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJUbGY1RFdnRlUyMlFyNEMyZW1wWHoxenZ3NVNPV09Sc3dDNnl3ZWVMYUFRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlcjd4RW1kTVNscUZLc2ZRbk5sTml3IiwicGhvbmVJZCI6IjRlYzJjYjRjLWFhODUtNDMxNS04OTBkLTVlZTIxMGFkMjM4ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVWVlxeTVCdGdVUnpvaGR4aVF3dXdRSHlvMWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0hXNUlIYnFxVGo3bnZuTTJKUHl3N0RGSFFZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhaTTRNQVZCIiwibWUiOnsiaWQiOiIyNjM3MTU1OTI5OTA6MjdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01HQmdxY0VFTitSMnJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhoTG9kNzR1Y21EYndOc0oySWY1WGVpYytwSmZLcDEwaDRDclpJeW5wMUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBjbDZKVGRaWk5ORGZEcGU2dU45RW8rS05qNWlnR1lpYmUzYkhObzRIei92bkNpUGRWZWx4dVpSSU5tczRDQmNWeUJYRURSczVGVEM3ZjVTZXV6cURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0ZkdXWnU5OXExbWJobVdybzNVcmY0a2s3L3Z4Zk9MeDNvVnpySFhTbVErcnpBaHpyd0JkS2RCUURoenNPdW5pZjhNSUl0dS8wMnp5Z25jQTdtVHNqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNTU5Mjk5MDoyN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjWVM2SGUrTG5KZzI4RGJDZGlIK1Yzb25QcVNYeXFkZEllQXEyU01wNmRRIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMTQxNDgzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUcxcCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "263787314672",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
