const data = {
  form_record_list_1: [
    {'form_input_1': 'John'}, 
    {'form_input_1': 'Sarah'},
    {'form_input_1': 'Carl'},
    {'form_input_1': 'James'},
    {'form_input_1': 'Karen'},
    {'form_input_1': 'Kristen'},
    {'form_input_1': 'Lisa'},
    {'form_input_1': 'Jacky'},
    {'form_input_1': 'Rebecca'},
    {'form_input_1': 'Ariana'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'John'}, 
    {'form_input_1': 'Sarah'},
    {'form_input_1': 'Carl'},
    {'form_input_1': 'James'},
    {'form_input_1': 'Karen'},
    {'form_input_1': 'Kristen'},
    {'form_input_1': 'Lisa'},
    {'form_input_1': 'Jacky'},
    {'form_input_1': 'Rebecca'},
    {'form_input_1': 'Ariana'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'John'}, 
    {'form_input_1': 'Sarah'},
    {'form_input_1': 'Carl'},
    {'form_input_1': 'James'},
    {'form_input_1': 'Karen'},
    {'form_input_1': 'Kristen'},
    {'form_input_1': 'Lisa'},
    {'form_input_1': 'Jacky'},
    {'form_input_1': 'Rebecca'},
    {'form_input_1': 'Ariana'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'John'}, 
    {'form_input_1': 'Sarah'},
    {'form_input_1': 'Carl'},
    {'form_input_1': 'James'},
    {'form_input_1': 'Karen'},
    {'form_input_1': 'Kristen'},
    {'form_input_1': 'Lisa'},
    {'form_input_1': 'Jacky'},
    {'form_input_1': 'Rebecca'},
    {'form_input_1': 'Ariana'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'Peter'},
    {'form_input_1': 'Peter'},
  ],
};

beforeEach(() => {
  cy.visit('/');
  cy.get('[data-cy=controls-FormRecordList]').drag('[data-cy=screen-drop-zone]', 'bottom');
  cy.get('[data-cy=toolbar-add]').click({force: true});
  cy.get('[data-cy=add-page-name]').type('page2');
  cy.get('#addPageModal___BV_modal_footer_ > .btn-secondary').click();
  cy.get('[data-cy=controls-FormInput]').drag('[data-cy=screen-drop-zone]', 'bottom');
  cy.get('[data-cy=toolbar-page]').select('0');
  cy.get('[data-cy=screen-element-container]').click();
  cy.get('[data-cy=accordion-Configuration]').click();
  cy.get('.form-check-label').click();
  cy.get('div.multiselect').click();
  cy.get('.multiselect__element > .multiselect__option span:contains("page2")').click();
  cy.get('button:contains("Columns")').click();
  cy.get('.col-2 > .fas').click();
  cy.get('#option-content').type('Test Input');
  cy.get('#option-value').type('form_input_1');
  cy.get('.card-footer > .btn-secondary').click();
  cy.get('[data-cy=mode-preview]').click();
});

describe('Pagination', () => {
  it('Should Not Be Visible', () => {
    cy.setPreviewDataInput({form_record_list_1: [{'form_input_1': 'John'}]});
    cy.get('[data-cy=table-pagination]').should('not.be.visible');
  });

  it('Should Be Visible', () => {
    cy.setPreviewDataInput(data);
    cy.get('[data-cy=table-pagination]').scrollIntoView().should('be.visible');
  });

  it('Should Display Data When Navigating Pages', () => {
    cy.setPreviewDataInput(data);
    cy.get('[data-cy=table-pagination] .ui > :nth-child(4)').click();
    cy.get('.vuetable tbody').find('tr').should('have.length', '1');
  });

  it('Update Per Page', () => {
    cy.setPreviewDataInput(data);
    cy.wait(500);
    cy.setVueComponentProperty('[data-cy=screen-field-form_record_list_1]', 'perPageSelectEnabled', true);
    cy.get('.pagination-nav-drop').select('25');
    cy.get('.vuetable tbody').find('tr').should('have.length', '25');
  });

  it('Displays Single Title', () => {
    cy.setPreviewDataInput({form_record_list_1: [{'form_input_1': 'John'}]});
    cy.wait(500);
    cy.setVueComponentProperty('[data-cy=screen-field-form_record_list_1]', 'single', 'Test');
    cy.setVueComponentProperty('[data-cy=screen-field-form_record_list_1]', 'perPageSelectEnabled', true);
    cy.get('[data-cy=table-pagination]').should('contain.text', 'Test');
  });

  it('Displays Plural Title', () => {
    cy.setPreviewDataInput(data);
    cy.wait(500);
    cy.setVueComponentProperty('[data-cy=screen-field-form_record_list_1]', 'plural', 'Tests');
    cy.setVueComponentProperty('[data-cy=screen-field-form_record_list_1]', 'perPageSelectEnabled', true);
    cy.get('[data-cy=table-pagination]').should('contain.text', 'Tests');
  });
});