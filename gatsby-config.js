const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const token = process.env.GATSBY_SMARTSHEET_TOKEN
const sheet = process.env.GATSBY_SMARTSHEET_SHEETID

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `source-smartsheet-plugin`,
      options: {
        accessToken: token,
        sheetId: sheet,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Roboto`],
        display: "swap",
      },
    },
  ],
}
