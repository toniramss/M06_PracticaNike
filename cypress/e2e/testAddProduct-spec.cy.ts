describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  beforeEach(() => {
    // Visitar la página donde está montado el componente.
    cy.visit('http://localhost:4200/admin'); // Cambia esto si es otro puerto
  });

  it('debería cargar la página y mostrar el formulario', () => {
    // Asegúrate de que el formulario está visible
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
      .click();  // Necesitamos hacer clic para abrir el dropdown
    cy.get('mat-option').contains('Ropa').click();
    cy.get('input[formcontrolname="stock"]').type('10');
    cy.get('mat-checkbox[formControlName="oferta"]')
      .should('be.visible')
      .click();
    cy.get('input[formcontrolname="imagen"]').type('http://example.com/imagen.jpg'); // Simular la subida de una imagen (puedes usar un archivo de prueba en Cypress)
    // Simular la subida de una imagen (puedes usar un archivo de prueba en Cypress)

    // Enviar el formulario
    cy.get('form').submit();

    // Verificar que la solicitud POST fue realizada y que el producto se añadió correctamente
    cy.intercept('POST', 'http://localhost:3000/postCreateProducto').as('createProduct');
    cy.wait('@createProduct').then((interception) => {
      // Comprobamos si la respuesta está definida antes de acceder a sus propiedades
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.body.nombre).to.eq('Producto Test');
      } else {
        throw new Error('No se recibió respuesta de la solicitud POST');
      }
    });
  });


})