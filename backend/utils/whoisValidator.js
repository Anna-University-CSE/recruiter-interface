const axios = require("axios");

async function verifyDomain(domain) {
  try {
    // Using whoisxmlapi.com as per your .env file
    const res = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService`, {
      params: {
        apiKey: process.env.WHOIS_API_KEY,
        domainName: domain,
        outputFormat: 'JSON'
      }
    });

    return res.data && res.data.WhoisRecord && res.data.WhoisRecord.createdDate;
  } catch (error) {
    console.error("WHOIS verification error:", error);
    return false;
  }
}

module.exports = verifyDomain;
