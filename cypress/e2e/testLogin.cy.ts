describe('template spec', () => {

    it('debería loguearse correctamente con credenciales válidas', () => {

        // Interceptamos el POST del login
        cy.intercept('POST', '**/auth', {
            statusCode: 200,
            body: {
                login: {
                    email: 'prueba2@gmail.com',
                    constrasenya: "1234"
                }
            }
        }).as('postLogin');

        cy.visit('http://localhost:4200/login');

        // Rellenar campos
        cy.get('input[formcontrolname="email"]').type('prueba2@gmail.com');
        cy.get('input[formcontrolname="contrasenya"]').type('1234', { force: true });

        // Enviar formulario
        cy.get('form').submit();

        cy.wait('@postLogin').then((interception) => {
            if (interception && interception.response) {
                expect(interception.response.statusCode).to.eq(200);
            } else {
                throw new Error('No se recibió respuesta de la solicitud POST');
            }
        });

    });
});
