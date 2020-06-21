import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import CashFlowClassifierDataService from '../api/services/CashFlowClassifiers.service';
import CashFlowDataService from '../api/services/CashFlows.service';
import { IDropdownPage, IDropdownAPI } from '../api/models/Dropdowns.model';
import { SelectField } from './SelectField';

class CashFlowForm extends Component<{refreshCashFlows: any}, { dropdownOptions: Array<IDropdownPage> }> {

  constructor(props: any) {
    super(props)
    this.state = { dropdownOptions: new Array<IDropdownPage>() }

    this.onSubmit = this.onSubmit.bind(this)
    this.refreshCashFlowClassifiers = this.refreshCashFlowClassifiers.bind(this);
  }
  
  public onSubmit(values: any) {
    CashFlowDataService.createCashFlow(values)
      .finally(
        () => {
          this.props.refreshCashFlows();
        });
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
      <Formik
        initialValues={Object}
        onSubmit={this.onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
      >
        {props => (
          <Form className="row">
            <fieldset className="form-group col">
              <Field
                className="form-control"
                type="date"
                name="creationDate"
                label="Date"
                placeholder="Date"
              />
            </fieldset>
            <fieldset className="form-group col">
              <Field
                className="form-control"
                type="number"
                name="cashAmount"
                placeholder="Cash"
              />
            </fieldset>
            <fieldset className="form-group col">
              <Field
                className="form-control"
                type="text"
                name="title"
                placeholder="Description"
              />
            </fieldset>

            <fieldset className="form-group col">
              <Field name={'classificationId'} component={SelectField} options={options} />
            </fieldset>
            <button className="btn btn-success col" type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default CashFlowForm;