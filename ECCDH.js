const crypto = require('crypto')
const {promisify} = require('util');
const generateKeyPair = promisify(crypto.generateKeyPair)


async function main() {


    const aliceKeyPair = await generateKeyPair('ec', {
        namedCurve: 'prime256v1'
    })
    const alicePublicKeyPem = aliceKeyPair.publicKey.export(
        {type: 'spki', format: 'pem'}
    )

    const bobKeyPair = await generateKeyPair('ec', {
        namedCurve: 'prime256v1'
    })
    const bobPublicKeyPem = bobKeyPair.publicKey.export(
        {type: 'spki', format: 'pem'}
    )

    const aliceSharedSecret = crypto.diffieHellman({
        publicKey: crypto.createPublicKey(bobPublicKeyPem),
        privateKey: aliceKeyPair.privateKey
    })

    const bobShareSecret = crypto.diffieHellman({
        publicKey: crypto.createPublicKey(alicePublicKeyPem),
        privateKey: bobKeyPair.privateKey
    })

    console.log("Alice SS: " + aliceSharedSecret.toString('hex'))
    console.log("Bob SS: " + bobShareSecret.toString('hex'))



}

main()