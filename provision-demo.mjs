/* Run locally only: node provision-demo.mjs
   Requires: npm i firebase-admin; set GOOGLE_APPLICATION_CREDENTIALS to a local service-account JSON.
   Never include that JSON in this project or deploy it. */
import admin from 'firebase-admin';
admin.initializeApp({credential:admin.credential.applicationDefault()});
const db=admin.firestore();
const accounts=[
 ['admin@shallotguard.demo','AdminDemo!2026','Administrator SHALLOTGUARD','admin','admin'],
 ['free@shallotguard.demo','FreeDemo!2026','Demo Petani Free','farmer','free'],
 ['premium@shallotguard.demo','PremiumDemo!2026','Demo Petani Premium','farmer','premium']
];
for(const [email,password,name,role,plan] of accounts){
 let record; try{record=await admin.auth().getUserByEmail(email)}catch{record=await admin.auth().createUser({email,password,displayName:name,emailVerified:true})}
 await admin.auth().setCustomUserClaims(record.uid,{role,plan});
 await db.collection('users').doc(record.uid).set({uid:record.uid,name,email,role,plan,createdAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
 console.log(`Provisioned ${email}`);
}
console.log('Done. Verify all three logins in Firebase Authentication and Firestore.');
