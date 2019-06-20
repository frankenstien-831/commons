/// <reference types="Cypress" />
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'

context('Consume', () => {
    before(() => {
        cy.on('window:before:load', win => {
            const provider = new HDWalletProvider(
                'taxi music thumb unique chat sand crew more leg another off lamp',
                'https://nile.dev-ocean.com'
            )
            win.web3 = new Web3(provider)
            win.ethereum = win.web3
        })

        cy.visit(
            'http://localhost:3000/asset/did:op:04ac33b152ca4532b184d6bd040e9535b572e1f2888e4f85b47035dd638772bb'
        )
        // Wait for end of loading
        cy.get('button', { timeout: 20000 }).should('have.length', 1)
    })

    it('Download button is clickable when user is connected.', () => {
        cy.get('button').should('not.be.disabled')
    })

    it('Consume asset and check if there is no error', () => {
        // Click consume button
        cy.get('button').click()
        // Wait consume process to end
        cy.get('button', { timeout: 60000 }).should('contain', 'Get file')
        // check if there is no error
        cy.get('article>div').should(
            'not.contain',
            '. Sorry about that, can you try again?'
        )
    })
})
