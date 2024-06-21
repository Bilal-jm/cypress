describe('Lightbox Tests', () => {
    beforeEach(() => {
        cy.visit('../lightbox.html'); 
    });

    it('Teste l’ouverture de la lightbox au clic sur l’image', () => {
        cy.get('.relative img').click();
        cy.get('#lightbox').should('be.visible');
    });

    it("Fermeture de l'image au clique en dehors", () => {
        
        cy.get('.relative img').click();
        cy.get('#lightbox').should('be.visible');
        cy.get('.fixed.top-0.left-0').click('topRight');
        cy.get('#lightbox').should('not.be.visible');
    });
    it('Teste l’ajout de la mention “j’aime” et la mise à jour des compteurs', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="unliked-svg"]').click();
        cy.get('[data-cy="liked-svg"]').should('be.visible');
        cy.get('[data-cy="like-count"]').should('contain', '1');
        cy.get('[data-cy="overlay-like-count"]').should('contain', '1');
    });
    it('Teste la suppression de la mention “j’aime” et la mise à jour des compteurs', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="unliked-svg"]').click();
        cy.get('[data-cy="liked-svg"]').click();
        cy.get('[data-cy="unliked-svg"]').should('be.visible');
        cy.get('[data-cy="like-count"]').should('contain', '0');
        cy.get('[data-cy="overlay-like-count"]').should('contain', '0');
    });
    it('Teste l’ajout d’un commentaire', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="comment-input"]').type('Cypress is awesome!');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-body-0"]').should('contain', 'Cypress is awesome!');
    });
    it('Teste que l’ajout d’un commentaire vide soit impossible', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="comment-publish"]').should('be.disabled');
    });
    it('Teste l’option qui cache les commentaires', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 1');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 2');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-sentence"]').click();
        cy.get('[data-cy="comment-body-0"]').should('not.be.visible');
        cy.get('[data-cy="comment-body-1"]').should('not.be.visible');
    });
    it('Teste les différents compteurs de commentaires', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 1');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 2');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="overlay-comment-count"]').should('contain', '2');
    });
    it('Teste le singulier/pluriel en fonction du nombre de commentaires', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 1');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 2');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-sentence"]').should('contain', 'Hide 2 comments');
    });
    it('Écrire trois commentaires et tester la supression du second commentaire au clique sur la bonne croix', () => {
        cy.get('[data-cy="lightbox-overlay"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 1');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 2');
        cy.get('[data-cy="comment-publish"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 3');
        cy.get('[data-cy="comment-publish"]').click();
        
        cy.get('.flex.items-center.justify-between').eq(2).find('svg[title="Supprimer le commentaire"]').click();
        
        cy.contains('.flex.items-center.justify-around', 'Comment 2').should('not.exist');




    });
});
