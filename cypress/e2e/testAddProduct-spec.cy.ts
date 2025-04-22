describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  beforeEach(() => {
    cy.visit('http://localhost:4200/admin');
  });

  it('debería cargar la página y mostrar el formulario', () => {
    cy.get('form').should('be.visible');
    cy.get('input[formcontrolname="nombreProducto"]').should('be.visible');
    cy.get('input[formcontrolname="precio"]').should('be.visible');
    cy.get('textarea[formcontrolname="descripcion"]').should('be.visible');
  });



  it('debería agregar un producto correctamente', () => {
    // Rellenar el formulario
    cy.get('input[formcontrolname="nombreProducto"]').type('Producto Test');
    cy.get('input[formcontrolname="numReferencia"]').type('12345');
    cy.get('input[formcontrolname="precio"]').type('99');
    cy.get('textarea[formcontrolname="descripcion"]').type('Descripción del producto');
    cy.get('mat-select[formControlName="tipoProducto"]')
      .should('be.visible')
      .click();
    cy.get('mat-option').contains('Ropa').click();
    cy.get('input[formcontrolname="stock"]').type('10');
    cy.get('mat-checkbox[formControlName="oferta"]')
      .should('be.visible')
      .click();
    cy.get('input[formcontrolname="imagen"]').type('http://example.com/imagen.jpg'); 

    // Enviar el formulario
    cy.get('form').submit();

    // Verificar que la solicitud POST fue realizada y que el producto se añadió correctamente
    cy.intercept('POST', 'http://localhost:3000/postCreateProducto').as('createProduct');
    cy.wait('@createProduct').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.body.nombre).to.eq('Producto Test');
      } else {
        throw new Error('No se recibió respuesta de la solicitud POST');
      }
    });
  });


})