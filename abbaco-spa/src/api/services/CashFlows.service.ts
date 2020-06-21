import axios, { AxiosResponse } from 'axios'
import { ICashFlow } from '../models/CashFlow.model';

const port = '8080'
const CASH_FLOW_API_URL = `http://localhost:${port}/api/cash-flows`

class CashFlowDataService {

    getAllCashFlows(cashFlowsFilters?: any): Promise<AxiosResponse<any>> {
        const query = this.getQuery(cashFlowsFilters);
        return axios.get(`${CASH_FLOW_API_URL}?${query}`)
    }

    public createCashFlow(cashFlow: ICashFlow): Promise<AxiosResponse<any>> {
        return axios.post(CASH_FLOW_API_URL, cashFlow);
    }

    public deleteCashFlow(cashFlowId: number): Promise<AxiosResponse<any>> {
        return axios.delete(`${CASH_FLOW_API_URL}/${cashFlowId}`);
    }

    private getQuery(cashFlowsFilters: any): string{
        if(!cashFlowsFilters) return '';
        let result = '';
        Object.entries(cashFlowsFilters).forEach(keyValue => {
            if(keyValue[1]){
                result = result + `${keyValue[0]}=${keyValue[1]}&`
            }
        });
        return result;
    }
}

export default new CashFlowDataService()