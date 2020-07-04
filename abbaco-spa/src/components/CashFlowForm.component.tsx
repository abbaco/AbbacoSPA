import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import CashFlowClassifierDataService from '../api/services/CashFlowClassifiers.service';
import CashFlowDataService from '../api/services/CashFlows.service';
import { IDropdownPage, IDropdownAPI } from '../api/models/Dropdowns.model';
import { SelectField } from './SelectField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          this.setState({ dropdownOptions: this.mapApiDropdownToPage(response.data._embedded?.cashFlowClassifierDtoList) })
        }
      )
  }

  private mapApiDropdownToPage(values: Array<IDropdownAPI>): Array<IDropdownPage> {
    if (!values) return new Array<IDropdownPage>();
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
            <div className="col">
            <fieldset className="form-group">
              <Field
                className="form-control"
                type="date"
                name="creationDate"
                label="Date"
                placeholder="Date"
              />
            </fieldset>
            </div>
            <div className="col">
            <fieldset className="form-group">
              <Field
                className="form-control"
                type="number"
                name="cashAmount"
                placeholder="Cash"
              />
            </fieldset>
            </div>
            <div className="col">
            <fieldset className="form-group">
              <Field
                className="form-control"
                type="text"
                name="title"
                placeholder="Description"
              />
            </fieldset>
            </div>

            <div className="col">
            <fieldset className="form-group">
              <Field name={'classificationId'} component={SelectField} options={options} />
            </fieldset>
            </div>
            <div className="col">
            <button className="btn" type="submit">
              <FontAwesomeIcon style={{ fontSize: 30 }} className="text-success" icon="save" />
            </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default CashFlowForm;