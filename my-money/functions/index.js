const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');

admin.initializeApp();

exports.soma = functions.database.ref('/movimentacoes/{dia}')
    .onWrite(async(change, context) => {
        const mesesRef = admin.database().ref('/meses/'+context.params.dia)
        const movimentacoesRef = change.after.ref
        const movimentacoesSS = await movimentacoesRef.once('value')
        const movimentacoes = movimentacoesSS.val()

        let entrada = 0
        let saida = 0

        Object.keys(movimentacoes).forEach( m => {
            if(movimentacoes[m].valor > 0) {
                entrada += parseFloat(movimentacoes[m].valor)
            } else {
                saida += parseFloat(movimentacoes[m].valor)
            }
        })

        return mesesRef.transaction(current => {
            if(current === null) {
                return {
                    entrada,
                    saida,
                    previsao_entrada: 0,
                    previsao_saida: 0
                }
            }

            return {
                ...current,
                entrada,
                saida
            }
        })
    });
