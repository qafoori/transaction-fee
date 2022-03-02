const { API_BASE_URL } = process.env;

module.exports = {
  CASH_IN: {
    url: `${API_BASE_URL}/tasks/api/cash-in`,
    method: "GET",
  },

  CASH_OUT_NATURAL: {
    url: `${API_BASE_URL}/tasks/api/cash-out-natural`,
    method: "GET",
  },

  CASH_OUT_JURIDICAL: {
    url: `${API_BASE_URL}/tasks/api/cash-out-juridical`,
    method: "GET",
  },
};
