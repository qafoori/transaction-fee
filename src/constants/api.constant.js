const { API_BASE_URL } = process.env

module.exports = {
  CASH_IN_API: {
    url: `${API_BASE_URL}/tasks/api/cash-in`,
    config: {
      method: 'get',
    },
  },

  CASH_OUT_NATURAL_API: {
    url: `${API_BASE_URL}/tasks/api/cash-out-natural`,
    config: {
      method: 'get',
    },
  },

  CASH_OUT_JURIDICAL_API: {
    url: `${API_BASE_URL}/tasks/api/cash-out-juridical`,
    config: {
      method: 'get',
    },
  },
}
