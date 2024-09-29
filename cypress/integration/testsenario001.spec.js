// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

/**
 * Adds command "cy.waitForResource(name)" that checks performance entries
 * for resource that ends with the given name.
 * This command only applies to the tests in this spec file
 *
 * @see https://developers.google.com/web/tools/chrome-devtools/network/understanding-resource-timing
 */
Cypress.Commands.add('waitForResource', (name, options = {}) => {
    if (Cypress.browser.family === 'firefox') {
      cy.log('Skip waitForResource in Firefox')

      return
    }

    cy.log(`Waiting for resource ${name}`)

    const log = false // let's not log inner commands
    const timeout = options.timeout || Cypress.config('defaultCommandTimeout')

    cy.window({ log }).then(
      // note that ".then" method has options first, callback second
      // https://on.cypress.io/then
      { log, timeout },
      (win) => {
        return new Cypress.Promise((resolve, reject) => {
          let foundResource

          // control how long we should try finding the resource
          // and if it is still not found. An explicit "reject"
          // allows us to show nice informative message
          setTimeout(() => {
            if (foundResource) {
              // nothing needs to be done, successfully found the resource
              return
            }

            clearInterval(interval)
            reject(new Error(`Timed out waiting for resource ${name}`))
          }, timeout)

          const interval = setInterval(() => {
            foundResource = win.performance
            .getEntriesByType('resource')
            .find((item) => item.name.endsWith(name))

            if (!foundResource) {
              // resource not found, will try again
              return
            }

            clearInterval(interval)
            // because cy.log changes the subject, let's resolve the returned promise
            // with log + returned actual result
            resolve(
              cy.log('✅ success').then(() => {
                // let's resolve with the found performance object
                // to allow tests to inspect it
                return foundResource
              })
            )
          }, 100)
        })
      }
    )
  })



describe('テスト大項目01', () => {
    context('テスト中項目01', () =>{
        it('テスト小項目01:ページを開く', () => {
            cy.viewport(1440, 798);
            // top indexにアクセスする
            cy.visit('http://localhost:3333');
        })

        it('テスト小項目02:指定idの要素があるか', () => {
            // https://docs.cypress.io/api/commands/get
            // id要素が存在するか
            cy.get('#title_message').should('exist');
        })
        it('テスト小項目03:指定id title_messageの内容が「テップとヂィールのキャラクター紹介」なのか', () => {
            // https://docs.cypress.io/api/commands/get
            // id要素が存在するか
            cy.get('#title_message').should('have.text','テップとヂィールのキャラクター紹介');
        })
        const timeout = 1500 // ms
        it('テスト小項目04:/css/index.cssファイルが存在するか', () => {
            // waitForResource defined at
            // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__wait-for-resource/cypress/e2e/spec.cy.js
            cy.waitForResource('/css/index.css')
        })

        it('テスト小項目05:（index.cssにて）bodyタグのbackground-color色指定が「rgb(248, 249, 250)」なのか', () => {
          cy.get('body', { timeout }).should('have.css', 'background-color', 'rgb(248, 249, 250)')
        })
        it('テスト小項目06:（index.cssにて）「card character-card」クラスの要素がhoverした際にscale（大きさ）が1.2倍になること', () => {
          //Hoverしていない時
          cy.get('.character-card').should('exist')

          //Hoverしている時
          cy.get('#card_1').realHover().should('have.css', 'scale', '1.2')
         })
    })
})
