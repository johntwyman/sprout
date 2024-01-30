const dollarBeforeRegex = /\$([0-9\.\,]{1,})/;
const dollarAfterRegex = /([0-9\.\,]*){1,}\$/;

const getIntAmount = (str) => {
  if (!str) {
    return null;
  }
  str = str.replace('$', '');
  str = str.replace(',', '');
  return parseInt(str);
}

const extractPledge = (message) => {
  let amount;
  let name;
  if (message.indexOf("$") !== -1) {
    // Happy path, hopefully
    const dollarBeforeMatch = dollarBeforeRegex.exec(message);
    if (dollarBeforeMatch) {
      amount = getIntAmount(dollarBeforeMatch[1]);
    }
    if (!amount) {
      // Slightly less happy path but still okay
      const dollarAfterMatch = dollarAfterRegex.exec(message);
      if (dollarAfterMatch) {
        amount = getIntAmount(dollarAfterMatch[1]);
      }
    }
  }
  if (!amount) {
    // Look for a properly formatted pledge that is missing $
    const lastBit = message.split(' ').pop();
    if (getIntAmount(lastBit)) {
      amount = getIntAmount(lastBit);
    }
  }
  if (!amount) {
    // Janky old-style Sprout parsing
    amount = parseInt(message.replace(/(\.\d+?)0+\b/g, '').replace(/\D/g, ''));
  }
  if (!(message.replace(/[^a-zA-Z] /g, '').length > 2)) {
    name = null;
  } else {
    name = message.replace(/[0-9]/g, '').replace(/\$/g, '');
  }
  if (!amount) {
    amount = null;
  }
  // Sanity check
  if (amount > 9999) {
    amount = null;
  }
  return {
    amount,
    name
  };
};

export default extractPledge;