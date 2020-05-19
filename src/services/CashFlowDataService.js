import axios from 'axios'

const CASH_FLOW_API_URL = 'https://abbaco-api.herokuapp.com/cashFlows'

class CashFlowDataService {

    retrieveAllCashFlows() {
        //console.log('executed service')
        return axios.get(CASH_FLOW_API_URL);
    }

    searchCashFlows(values) {
        //console.log('executed service')
        return axios.put(CASH_FLOW_API_URL+"/search", values);
    }

    retrieveCashFlow(id) {
        //console.log('executed service')
        return axios.get(CASH_FLOW_API_URL+"/"+id);
    }

    deleteCashFlow(id) {
        //console.log('executed service')
        return axios.delete(CASH_FLOW_API_URL+"/"+id);
    }

    updateCashFlow(id, cashFlow) {
        //console.log('executed service')
        return axios.put(CASH_FLOW_API_URL+"/"+id, cashFlow);
    }

    createCashFlow(cashFlow) {
        cashFlow.dropdownOptions=null
        cashFlow.dropdownField=null
        return axios.post(CASH_FLOW_API_URL, cashFlow);
    }
}

export default new CashFlowDataService()