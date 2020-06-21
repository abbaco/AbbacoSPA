import React, { Component } from 'react';
import { IDropdownPage, IDropdownAPI } from '../api/models/Dropdowns.model';
import CashFlowClassifierDataService from '../api/services/CashFlowClassifiers.service';
import CashFlowDataService from '../api/services/CashFlows.service';

class SearchFormComponent extends Component<{refreshCashFlows: any}, { dropdownOptions: Array<IDropdownPage> }> {

  constructor(props: any) {
    super(props)
    this.state = { dropdownOptions: new Array<IDropdownPage>() }

    this.onSubmit = this.onSubmit.bind(this)
    this.refreshCashFlowClassifiers = this.refreshCashFlowClassifiers.bind(this);
  }
  
  public onSubmit(values: any) {
  }

  public componentDidMount(): void {
    this.refreshCashFlowClassifiers();
  }

  public refreshCashFlowClassifiers(): void {
    CashFlowClassifierDataService.getAllCashFlowClassifiers()
      .then(
        response => {
          this.setState({ dropdownOptions: this.mapApiDropdownToPage(response.data._embedded.cashFlowClassifierDtoList) })
        }
      )
  }

  private mapApiDropdownToPage(values: Array<IDropdownAPI>): Array<IDropdownPage> {
    const result = values.map(value => new Object({ value: value.id, label: value.name }));
    return result as IDropdownPage[];
  }

  render() {
    let options = this.state.dropdownOptions;
    return (
      <p>TODO</p>
    );
  }
}

export default SearchFormComponent;