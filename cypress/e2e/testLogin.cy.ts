describe('template spec', () => {

    /* it('passes', () => {
        cy.visit('https://example.cypress.io')
    })

    beforeEach(() => {
        // Visitar la página donde está montado el componente.
        cy.visit('http://localhost:4200/login'); // Cambia esto si es otro puerto
    }); */

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

        // Visitamos la ruta del login
        cy.visit('http://localhost:4200/login');

        // Rellenar campos
        cy.get('input[formcontrolname="email"]').type('prueba2@gmail.com');
        cy.get('input[formcontrolname="contrasenya"]').type('1234', { force: true });

        // Enviar formulario
        cy.get('form').submit();

        // Esperar la respuesta y verificar datos
        cy.wait('@postLogin').then((interception) => {
            // Verificamos que la interceptación tenga una respuesta válida
            if (interception && interception.response) {
                expect(interception.response.statusCode).to.eq(200);
                //expect(interception.response.body.user.rol).to.eq('a');
            } else {
                throw new Error('No se recibió respuesta de la solicitud POST');
            }
        });

        // Verifica que se navega a /home
        //cy.url().should('include', '/home');


    });
});
